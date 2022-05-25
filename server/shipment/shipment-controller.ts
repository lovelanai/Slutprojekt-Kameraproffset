import { Request, Response } from 'express';
import { ShipmentModel } from './shipment-model';

export const getAllShipmentMethods = async (req: Request, res: Response) => {
  const shipments = await ShipmentModel.find({});
  res.status(200).json(shipments);
  res.send();
};
