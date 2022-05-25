import express from 'express';
import { getAllPaymentMethods } from './payment-controllers';

export const paymentRouter = express
  .Router()
  .get('/payment', getAllPaymentMethods);
