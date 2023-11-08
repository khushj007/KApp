import { NextRequest, NextResponse } from "next/server";
import openapi from "@/AI_API/AI_API";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";
import user from "@/schema/user_schema";
import saveUser from "@/helpers/saveUser";
import connect from "@/DBconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = auth();
    // console.log(`USERID`, userId); working

    const instructionMessage: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "system",
      content:
        "You are a code generator .You must answer only in markdown code snippet .use code comments for explanations",
    };

    const { messages } = await request.json();
    // console.log(`message`, messages);

    if (!data.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!messages) {
      return NextResponse.json(
        { message: "Data not received" },
        { status: 400 }
      );
    }

    // console.log("messages send for code route", [
    //   instructionMessage,
    //   ...messages,
    // ]);

    // check for api counts and user
    const dbresponse = await user.findOne({ userId: data.userId });

    if (dbresponse.apiCount < dbresponse.apiLimit) {
      const response = await openapi.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [instructionMessage, ...messages],
      });

      dbresponse.apiCount = dbresponse.apiCount + 1;
      await dbresponse.save();
      return NextResponse.json({
        message: response.choices[0].message,
        status: 201,
      });
    } else {
      return NextResponse.json({
        message: "API COUNT IS EXCEDED FOR NORMAL VERSION",
        status: 403,
      });
    }

    // console.log(`RESPONSE `, response.choices[0].message);
  } catch (error: any) {
    console.log(`CODE ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
