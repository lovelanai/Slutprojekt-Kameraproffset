import mongoose from 'mongoose';

export interface Specification {
  title: string;
  value: string;
}

export interface Category {
  brand: string;
  type: string;
}

export interface Product {
  title: String;
  longinfo: String;
  info: String[];
  price: Number;
  quantity: number;
  images: string[];
  category: Category;
  // cameratype: CameraType[];
  specifications: Specification[];
}

export const productSchema = new mongoose.Schema({
  title: { type: String },
  longinfo: { type: String },
  info: { type: [String] },
  price: { type: Number },
  quantity: { type: Number },
  images: { type: [String] },
  category: {
    brand: { type: String },
    type: { type: String },
  },
  // cameratype: { type: [String] },

  specifications: [
    {
      title: { type: String },
      value: { type: String },
    },
  ],
});

export const ProductModel = mongoose.model<Product>('Product', productSchema);
