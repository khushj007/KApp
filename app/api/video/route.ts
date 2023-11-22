import { NextRequest, NextResponse } from "next/server";

import replicate from "@/AI_API/REPLICATE_API_CONFIG";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const output = await replicate.run(
      "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
      {
        input: {
          prompt: prompt,
        },
      }
    );

    return NextResponse.json({ message: output, status: 201 });
  } catch (error: any) {
    console.log(`MUSIC ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
