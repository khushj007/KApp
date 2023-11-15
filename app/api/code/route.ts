import { NextRequest, NextResponse } from "next/server";
import openapi from "@/AI_API/AI_API";
import OpenAI from "openai";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const instructionMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "system",
      content:
        "You are a code generator .You must answer only in markdown code snippet .use code comments for explanations",
    };

    const { messages } = await request.json();

    if (!messages) {
      return NextResponse.json(
        { message: "Data not received" },
        { status: 400 }
      );
    }

    // check for api counts and user

    const response = await openapi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });

    return NextResponse.json({
      message: response.choices[0].message,
      status: 201,
    });
  } catch (error: any) {
    console.log(`CODE ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
