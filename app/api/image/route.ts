import { NextRequest, NextResponse } from "next/server";
import openai from "@/AI_API/AI_API";
import { auth } from "@clerk/nextjs";
import connect from "@/DBconfig";
import user from "@/schema/user_schema";
import saveUser from "@/helpers/saveUser";

connect();
export async function POST(request: NextRequest) {
  try {
    const data = auth();
    const Data = await request.json();
    if (!data.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!Data) {
      return NextResponse.json(
        { message: "Data not received" },
        { status: 400 }
      );
    }

    // insert user in databse

    const dbresponse = await user.findOne({ userId: data.userId });

    if (dbresponse.apiCount < dbresponse.apiLimit) {
      const response = await openai.images.generate({
        prompt: Data.prompt,
        n: Number(Data.n),
        size: Data.size,
      });
      dbresponse.apiCount = dbresponse.apiCount + 1;
      await dbresponse.save();

      return NextResponse.json({ message: response.data });
    } else {
      return NextResponse.json({
        message: "API COUNT IS EXCEDED FOR NORMAL VERSION",
        status: 403,
      });
    }
  } catch (error: any) {
    console.log(`Image ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
