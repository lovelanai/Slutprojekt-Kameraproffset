import mongoose from 'mongoose';

export interface Product {
  title: String;
  longinfo: String;
  info1: String;
  info2: String;
  info3: String;
  price: Number;
  quantity: number;
  image: string;
  image2: string;
  image3: string;
  spectitle: string;
  spec: string;
  specid: string;
}

const productSchema = new mongoose.Schema({
  title: { type: String },
  longinfo: { type: String },
  info1: { type: String },
  info2: { type: String },
  info3: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  image: { type: String },
  image2: { type: String },
  image3: { type: String },
  specstitle: { type: String },
  spec: { type: String },
  specid: { type: String },
});

export const ProductModel = mongoose.model<Product>('product', productSchema);
