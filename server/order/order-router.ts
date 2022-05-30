import express from 'express';
import { createOrder } from './order-controller';
export const orderRouter = express.Router().post('/order', createOrder);
