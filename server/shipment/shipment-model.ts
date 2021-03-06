import mongoose from 'mongoose';

export interface Shipment {
  _id: string;
  title: string;
  price: number;
  info: string;
}

export const shipmentSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  info: { type: String },
});

export const ShipmentModel = mongoose.model<Shipment>(
  'Shipment',
  shipmentSchema
);
