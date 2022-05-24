import mongoose from 'mongoose';

export interface User {
  email: string;
  password: string;
  isAdmin: boolean;
  role: mongoose.Schema.Types.ObjectId;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: false },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
});

export const UserModel = mongoose.model<User>('user', userSchema);
