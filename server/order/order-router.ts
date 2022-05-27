import express from 'express';
import {
    addOrder,

} from './order-controller';
export const userRouter = express
    .Router()
    .post('/order/order', addOrder)
