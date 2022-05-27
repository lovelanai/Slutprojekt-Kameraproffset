import { Request, Response, NextFunction } from 'express';
import { ProductModel, Product } from './product-model';
import cookieSession from 'cookie-session';

export const getAllProducts = async (req: Request, res: Response) => {
  const products = await ProductModel.find({});
  res.status(200).json(products);
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await ProductModel.findById(req.params.id);
  res.status(200).json(product);
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session?.user?.isAdmin !== true) {
    res.status(401);
    res.send({
      message: 'Du kan inte lägga till produkter utan att vara admin',
    });
    return;
  }

  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  if (req.session?.user?.isAdmin !== true) {
    res.status(401);
    res.send({
      message: 'Du kan inte ta bort produkter utan att vara admin',
    });
    return;
  }
  const product = await ProductModel.findByIdAndDelete(req.params.id);
  console.log('delete product');
  res.status(200).json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  if (req.session?.user?.isAdmin !== true) {
    res.status(401);
    res.send({
      message: 'Du kan inte uppdatera produkter utan att vara admin',
    });
    return;
  }

  const { id } = req.params;

  await ProductModel.findByIdAndUpdate(id, req.body);

  console.log(req.body);

  console.log('updateProduct');

  res.status(200).json({
    new: req.body,
  });
};
