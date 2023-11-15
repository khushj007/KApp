import { NextRequest, NextResponse } from "next/server";
import replicate from "@/AI_API/REPLICATE_API_CONFIG";

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
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    return NextResponse.json({ message: output, status: 201 });

    // console.log(`OUTPUT`, output);
  } catch (error: any) {
    console.log(`MUSIC ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
