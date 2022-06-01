import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { assertIsLoggedIn } from '../errorFunctions';
import { PaymentModel } from './payment-model';

export const getAllPaymentMethods = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsLoggedIn(
      req,
      res,
      'Användare måste vara inloggad för hämta alla betalmetoder'
    );

    const payment = await PaymentModel.find({});
    res.status(200).json(payment);
  }
);
