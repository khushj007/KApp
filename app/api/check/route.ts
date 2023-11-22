import { NextRequest, NextResponse } from "next/server";
import user from "@/schema/user_schema";
import { auth } from "@clerk/nextjs";
import connect from "@/DBconfig";

export async function GET(route: NextRequest) {
  connect();
  const data = auth();
  const dbresponse = await user.findOne({ userId: data.userId });

  if (dbresponse.apiCount < dbresponse.apiLimit) {
    dbresponse.apiCount += 1;
    await dbresponse.save();
    return NextResponse.json({ status: 201 });
  } else {
    dbresponse.apiCount = dbresponse.apiLimit;
    await dbresponse.save();
    return NextResponse.json({ status: 401 });
  }
}
