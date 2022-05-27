import mongoose from 'mongoose';
import {Product} from "../product/product-model";

export interface Order {
    title: string;
    price: number;
    quantity: number;
}

const orderSchema = new mongoose.Schema({
    title: { type: String },
    price: { type: String },
    quantity: { type: Number }
});

export const OrderModel = mongoose.model<Order>('order', orderSchema);