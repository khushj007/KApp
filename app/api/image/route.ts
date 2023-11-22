import { NextRequest, NextResponse } from "next/server";
import openai from "@/AI_API/AI_API";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const Data = await request.json();

    const response = await openai.images.generate({
      prompt: Data.prompt,
      n: Number(Data.n),
      size: Data.size,
    });

    return NextResponse.json({ message: response.data });
  } catch (error: any) {
    console.log(`Image ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
