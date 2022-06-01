import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import 'cookie-session';
import { OrderModel } from './order-model';
import { ProductModel } from '../product/product-model';
import { ShipmentModel } from '../shipment/shipment-model';
import { PaymentModel } from '../payment/payment-model';
import { assertIsLoggedIn, assertIsAdmin } from '../errorFunctions';

export const createOrder = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsLoggedIn(
      req,
      res,
      'Användare måste vara inloggad för att skapa en beställning'
    );

    const productPromises = req.body.products.map(async (p: any) => {
      const productDoc = await ProductModel.findById(p.id);
      if (!productDoc) {
        res.status(400);
        throw new Error('Ogiltigt produkt-id');
      }

      if (productDoc.quantity < p.quantity) {
        res.status(400);
        throw new Error(
          'Det går inte att beställa fler av en produkt än vad som finns i lager'
        );
      }

      productDoc.quantity -= p.quantity;

      await productDoc.save();
      productDoc.quantity = p.quantity;

      return productDoc;
    });

    const products = await Promise.all(productPromises);

    const payment = await PaymentModel.findById(req.body.payment);
    if (!payment) {
      res.status(400);
      throw new Error('Ogiltigt betalnings-id');
    }

    const shipment = await ShipmentModel.findById(req.body.shipment);
    if (!shipment) {
      res.status(400);
      throw new Error('Ogiltigt frakt-id');
    }

    const order = new OrderModel();
    order.user = req.session!.user;
    order.email = req.body.email;
    order.phoneNumber = req.body.phoneNumber;
    order.products = products;
    order.deliveryAddress = req.body.deliveryAddress;
    order.payment = payment;
    order.shipment = shipment;

    await order.save();

    res.status(200).json(order);
  }
);

export const getAllOrders = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte hämta alla ordrar utan att vara inloggad som admin'
    );

    const orders = await OrderModel.find({}).populate('user');
    res.status(200).json(orders);
  }
);
