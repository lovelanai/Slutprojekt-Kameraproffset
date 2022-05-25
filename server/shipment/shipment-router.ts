import express from 'express';
import { getAllShipmentMethods } from './shipment-controller';

export const shipmentRouter = express
  .Router()
  .get('/shipment', getAllShipmentMethods);
