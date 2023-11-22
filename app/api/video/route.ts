import { NextRequest, NextResponse } from "next/server";
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
        "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
        {
          input: {
            prompt: prompt,
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
