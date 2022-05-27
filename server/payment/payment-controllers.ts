import { Request, Response } from 'express';
import { PaymentModel } from './payment-model';

export const getAllPaymentMethods = async (req: Request, res: Response) => {
  const payment = await PaymentModel.find({});
  res.status(200).json(payment);
};
