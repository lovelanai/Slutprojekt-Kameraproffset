import mongoose from 'mongoose';

export interface Payment {
  _id: string;
  title: string;
  price: number;
  info: string;
  alt: string;
}

const paymentSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  info: { type: String },
  alt: { type: String },
});

export const PaymentModel = mongoose.model<Payment>('payment', paymentSchema);
