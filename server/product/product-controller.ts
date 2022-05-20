import { Request, Response, NextFunction } from 'express';
import { ProductModel, Product } from './product-model';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({});
  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.find({});
  res.status(200).json(product);
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = new ProductModel(req.body);
    await user.save();
    res.status(200).json(user);
    console.log('user');
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  console.log('delete product');
  res.status(200).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  await ProductModel.findByIdAndUpdate(id, req.body);

  console.log(req.body);

  console.log('updateProduct');

  res.status(200).json({
    new: req.body,
  });
};
