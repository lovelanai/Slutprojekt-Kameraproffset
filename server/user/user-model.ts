import mongoose from 'mongoose';

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
});

export const UserModel = mongoose.model<User>('user', userSchema);
