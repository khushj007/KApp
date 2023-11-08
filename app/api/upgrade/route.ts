import { auth } from "@clerk/nextjs";
import connect from "@/DBconfig";
import user from "@/schema/user_schema";
import { NextResponse } from "next/server";

connect();
export async function GET() {
  // console.log(`payment route hit`);
  const { userId } = auth();

  if (userId) {
    const userData = await user.findOne({ userId: userId });

    if (userData) {
      userData.apiLimit = 5;
      userData.apiCount = 0;
      userData.isPro = true;

      await userData.save();

      return NextResponse.json({ message: "success", status: 201 });
    }
  }

  return NextResponse.json({ message: "fail", status: 400 });
}
