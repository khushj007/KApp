import { NextRequest, NextResponse } from "next/server";
import openapi from "@/AI_API/AI_API";
import { auth } from "@clerk/nextjs";
import user from "@/schema/user_schema";
import saveUser from "@/helpers/saveUser";
import connect from "@/DBconfig";
import { conversation } from "@/AI_API/Conversation";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = auth();
    // console.log(`USERID`, userId); working

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

    // check for api counts and user
    const dbresponse = await user.findOne({ userId: data.userId });

    if (dbresponse.apiCount < dbresponse.apiLimit) {
      const response = await conversation(messages);
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
    console.log(`CONVERSATION ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
