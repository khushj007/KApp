import { NextRequest, NextResponse } from "next/server";
import openapi from "@/AI_API/AI_API";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    const response = await openapi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json({
      message: response.choices[0].message,
      status: 201,
    });
  } catch (error: any) {
    console.log(`CONVERSATION ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
