import connect from "@/DBconfig";
import user from "@/schema/user_schema";
import { auth } from "@clerk/nextjs";

export async function updateData() {
  try {
    connect();
    const data = auth();
    console.log(`data`, data);
    // const dbresponse = await user.findOne({ userId: data.userId });

    // if (dbresponse.apiCount < dbresponse.apiLimit) {
    //   dbresponse.apiCount += 1;
    // } else {
    //   dbresponse.apiCount = dbresponse.apiLimit;
    // }

    // await dbresponse.save();
  } catch (error: any) {
    console.log(`updateDataerror`, error.message);
  }
}
