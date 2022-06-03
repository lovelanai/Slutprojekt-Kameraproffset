import express from 'express';
import { createOrder, getAllOrders, getMyOrders } from './order-controller';
export const orderRouter = express
  .Router()
  .get('/allOrders', getAllOrders)
  .get('/myOrders', getMyOrders)
  .post('/order', createOrder);
