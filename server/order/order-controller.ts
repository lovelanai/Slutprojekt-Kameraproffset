import { Request, Response, NextFunction } from 'express';
import { Order, OrderModel } from '../order/order-model';
import { Product, ProductModel } from '../product/product-model';
import { ShipmentModel } from '../shipment/shipment-model';
import { User } from '../user/user-model';
import CookieSessionInterfaces from 'cookie-session';
import { PaymentModel } from '../payment/payment-model';

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session?.user === undefined) {
      throw new Error(
        'Användare måste vara inloggad för att skapa en beställning'
      );
    }

    const productPromises = req.body.products.map(async (p: any) => {
      const productDoc = await ProductModel.findById(p.id);
      if (!productDoc) {
        throw new Error('Ogiltigt produkt-id');
      }

      productDoc.quantity = p.quantity;

      return productDoc;
    });

    const products = await Promise.all(productPromises);

    const payment = await PaymentModel.findById(req.body.payment);
    if (!payment) {
      throw new Error('Ogiltigt betalnings-id');
    }

    const shipment = await ShipmentModel.findById(req.body.shipment);
    if (!shipment) {
      throw new Error('Ogiltigt frakt-id');
    }

    const order = new OrderModel();
    order.user = req.session.user;
    order.email = req.body.email;
    order.phoneNumber = req.body.phoneNumber;
    order.products = products;
    order.deliveryAddress = req.body.deliveryAddress;
    order.payment = payment;
    order.shipment = shipment;

    await order.save();

    res.status(200).json(order);
  } catch (err) {
    next(err);
  }
};
