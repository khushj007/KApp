import { NextRequest, NextResponse } from "next/server";
import replicate from "@/AI_API/REPLICATE_API_CONFIG";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();
    // console.log(`message`, prompt);

    if (!prompt) {
      return NextResponse.json(
        { message: "Data not received" },
        { status: 400 }
      );
    }

    // check for api counts and user

    const output = await replicate.run(
      "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
      {
        input: {
          prompt_a: prompt,
        },
      }
    );

    return NextResponse.json({ message: output, status: 201 });
  } catch (error: any) {
    // console.log(`OUTPUT`, output);
    console.log(`MUSIC ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
