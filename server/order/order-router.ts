import express from 'express';
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  markOrderSent,
} from './order-controller';
export const orderRouter = express
  .Router()
  .get('/allOrders', getAllOrders)
  .get('/myOrders', getMyOrders)
  .post('/order', createOrder)
  .put('/order/send/:id', markOrderSent);
