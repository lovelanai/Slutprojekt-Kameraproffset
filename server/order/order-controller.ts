import { Request, Response, NextFunction } from 'express';
import { Order, OrderModel } from "../order/order-model";
import argon2 from "argon2";
import {Product} from "../product/product-model";

export const addOrder = async (
    req: Request<{}, {}, Order>,
    res: Response,
    next: NextFunction
) => {
    try {
        const orderData = {
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity
        };

        const order = new OrderModel(orderData);
        await order.save();
        res.status(200).json(order);

    } catch (err) {
        next(err);
    }
};