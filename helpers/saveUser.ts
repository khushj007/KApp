import user from "@/schema/user_schema";
export default async function saveUser(userId: string) {
  // find user

  const value = await user.findOne({ userId: userId });

  if (!value) {
    const doc = await new user();

    doc.userId = userId;
    doc.isPro = false;
    doc.apiLimit = 3;
    doc.apiCount = 0;

    await doc.save();

    console.log(`user saved`);
  } else {
    console.log(`user alreday exist`);
  }
}
