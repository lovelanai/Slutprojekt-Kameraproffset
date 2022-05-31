import mongoose, { Types } from "mongoose";

export interface Specification {
  title: string;
  value: string;
}

export interface Category {
  category: string[];
}

export interface SubCategory {
  subCategory: string[];
}

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
  category: Category[];
  subcategory: SubCategory[];
  specifications: Specification[];
}

export const productSchema = new mongoose.Schema({
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
  category: { type: [String] },
  subcategory: { type: [String] },

  specifications: [
    {
      title: { type: String },
      value: { type: String },
    },
  ],
});

export const ProductModel = mongoose.model<Product>("Product", productSchema);
