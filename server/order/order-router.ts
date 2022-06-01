import express from 'express';
import { createOrder, getAllOrders, getMyOrders } from './order-controller';
export const orderRouter = express
  .Router()
  .get('/allorders', getAllOrders)
  .get('/myorders', getMyOrders)
  .post('/order', createOrder);
