import express from 'express';
import { createOrder, getAllOrders } from './order-controller';
export const orderRouter = express
  .Router()
  .get('/allorders', getAllOrders)
  .post('/order', createOrder);
