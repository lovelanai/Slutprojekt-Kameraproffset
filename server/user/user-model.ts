import mongoose from "mongoose";

export interface User {
  email: string;
  password: string;
  // isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  // isAdmin: { type: Boolean, required: false, default: false },
});

export const UserModel = mongoose.model<User>("user", userSchema);
