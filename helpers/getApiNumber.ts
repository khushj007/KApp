import user from "@/schema/user_schema";
import { auth } from "@clerk/nextjs";
import saveUser from "./saveUser";
import connect from "@/DBconfig";

connect();

export default async function apiCount() {
  const { userId } = auth();

  if (userId) {
    const doc: any = await user.findOne({ userId: userId });

    if (doc) {
      return {
        apiLimitCount: Number(doc.apiCount),
        isPro: doc.isPro,
        apiLimit: Number(doc.apiLimit),
      };
    } else {
      saveUser(userId);
    }
  } else {
    console.log(`user is not signed in`);
  }
}
