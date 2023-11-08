import { NextRequest, NextResponse } from "next/server";
import openapi from "@/AI_API/AI_API";
import { auth } from "@clerk/nextjs";
import replicate from "@/AI_API/REPLICATE_API_CONFIG";
import user from "@/schema/user_schema";
import saveUser from "@/helpers/saveUser";
import connect from "@/DBconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const data = auth();

    const { prompt } = await request.json();
    // console.log(`message`, prompt);

    if (!data.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!prompt) {
      return NextResponse.json(
        { message: "Data not received" },
        { status: 400 }
      );
    }

    // check for api counts and user
    const dbresponse = await user.findOne({ userId: data.userId });

    if (dbresponse.apiCount < dbresponse.apiLimit) {
      const output = await replicate.run(
        "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
        {
          input: {
            prompt_a: prompt,
          },
        }
      );
      dbresponse.apiCount = dbresponse.apiCount + 1;
      await dbresponse.save();
      return NextResponse.json({ message: output, status: 201 });
    } else {
      return NextResponse.json({
        message: "API COUNT IS EXCEDED FOR NORMAL VERSION",
        status: 403,
      });
    }

    // console.log(`OUTPUT`, output);
  } catch (error: any) {
    console.log(`MUSIC ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
