import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import openapi from "@/AI_API/AI_API";
import { auth } from "@clerk/nextjs";

export const runtime = "edge"; // 'nodejs' is the default

export async function POST(request: NextRequest) {
  try {
    const data = auth();
    // console.log(`USERID`, userId); working

    const { messages } = await request.json();
    // console.log(`message`, messages);

    if (!messages) {
      return NextResponse.json(
        { message: "Data not received" },
        { status: 400 }
      );
    }

    // check for api counts and user

    const response = await openapi.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    return NextResponse.json({
      message: response.choices[0].message,
      status: 201,
    });

    // console.log(`RESPONSE `, response.choices[0].message);
  } catch (error: any) {
    console.log(`CONVERSATION ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
