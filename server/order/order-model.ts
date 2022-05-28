import mongoose from 'mongoose';
import { Payment, paymentSchema } from '../payment/payment-model';
import { Product, productSchema } from '../product/product-model';
import { Shipment, shipmentSchema } from '../shipment/shipment-model';
import { User } from '../user/user-model';

export interface Address {
  street: string;
  zipcode: string;
  fullname: string;
}

const addressSchema = new mongoose.Schema({
  street: { type: String },
  zipcode: { type: String },
  firstname: { type: String },
  lastname: { type: String },
});

export interface Order {
  user: User;
  email: string;
  phoneNumber: string;
  products: Product[];
  deliveryAddress: Address;
  payment: Payment;
  shipment: Shipment;
  orderDate: Date;
}

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  email: { type: String },
  phoneNumber: { type: String },
  products: { type: [productSchema] },
  deliveryAddress: addressSchema,
  payment: paymentSchema,
  shipment: shipmentSchema,
  orderDate: { type: Date, default: Date.now },
});

export const OrderModel = mongoose.model<Order>('order', orderSchema);
