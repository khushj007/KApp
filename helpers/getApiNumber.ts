import user from "@/schema/user_schema";
import { auth } from "@clerk/nextjs";
import saveUser from "./saveUser";
import connect from "@/DBconfig";
import { redirect } from "next/navigation";

export default async function apiCount() {
  connect();
  const { userId } = auth();

  if (userId) {
    const doc: any = await user.findOne({ userId: userId });

    if (doc) {
      return {
        apiLimitCount: Number(doc.apiCount) || 0,
        isPro: doc.isPro || 0,
        apiLimit: Number(doc.apiLimit) || 0,
      };
    } else {
      saveUser(userId);
      redirect("/dashboard");
    }
  } else {
    console.log(`user is not signed in`);
    return {
      apiLimitCount: 3,
      isPro: "trial",
      apiLimit: 0,
    };
  }
}
