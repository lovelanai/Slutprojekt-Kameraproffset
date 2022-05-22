import { Product } from './interfaces/interfaces';

const getAllProducts = async (): Promise<Product[]> =>
  await fetch('/api/products').then((response) => response.json());

const addProduct = async (product: Product): Promise<Response> =>
  await fetch(`/api/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

const updateProduct = async (product: Product): Promise<Response> =>
  await fetch(`/api/product/${product._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

const removeProduct = async (product: Product): Promise<Response> =>
  await fetch(`/api/product/${product._id}`, {
    method: 'DELETE',
  });

export { getAllProducts, addProduct, updateProduct, removeProduct };