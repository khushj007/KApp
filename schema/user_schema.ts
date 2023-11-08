import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: String,
  apiLimit: Number,
  apiCount: Number,
  isPro: Boolean,
});

const user = mongoose.models.users || mongoose.model("users", userSchema);

export default user;
