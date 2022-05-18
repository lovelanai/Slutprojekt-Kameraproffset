import mongoose from 'mongoose';

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, required: false, default: false },
});

export const UserModel = mongoose.model<User>('user', userSchema);
