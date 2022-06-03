import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import 'cookie-session';
import { ProductModel } from './product-model';
import { assertIsAdmin } from '../errorFunctions';

export const getAllProducts = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const products = await ProductModel.find({});
    res.status(200).json(products);
  }
);

export const getProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const product = await ProductModel.findById(req.params.id);
    res.status(200).json(product);
  }
);

export const addProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte lägga till produkter utan att vara inloggad som admin'
    );

    const product = new ProductModel(req.body);
    await product.save();
    res.status(200).json(product);
  }
);

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte ta bort produkter utan att vara inloggad som admin'
    );

    const product = await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  }
);

export const updateProduct = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    assertIsAdmin(
      req,
      res,
      'Du kan inte uppdatera produkter utan att vara inloggad som admin'
    );

    const { id } = req.params;

    await ProductModel.findByIdAndUpdate(id, req.body);

    res.status(200).json({
      new: req.body,
    });
  }
);
