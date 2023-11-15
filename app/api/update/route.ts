import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import user from "@/schema/user_schema";
import saveUser from "@/helpers/saveUser";
import connect from "@/DBconfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const data = auth();

    if (!data.userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // check for api counts and user
    const dbresponse = await user.findOne({ userId: data.userId });

    if (dbresponse.apiCount < dbresponse.apiLimit) {
      dbresponse.apiCount = dbresponse.apiCount + 1;
      await dbresponse.save();
      return NextResponse.json({
        message: "userData updated successfussly",
        status: 201,
      });
    } else {
      return NextResponse.json({
        message: "API COUNT IS EXCEDED FOR NORMAL VERSION",
        status: 403,
      });
    }
  } catch (error: any) {
    console.log(`CONVERSATION ERROR`, error.message);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
}
