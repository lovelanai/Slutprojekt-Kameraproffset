import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { assertIsLoggedIn } from '../errorFunctions';
import { ShipmentModel } from './shipment-model';

export const getAllShipmentMethods = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsLoggedIn(
      req,
      res,
      'Användare måste vara inloggad för hämta alla fraktalternativ'
    );

    const shipments = await ShipmentModel.find({});
    res.status(200).json(shipments);
  }
);
