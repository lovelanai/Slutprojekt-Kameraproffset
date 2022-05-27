import { Delivery, Payment, Product } from './interfaces/interfaces';

const getAllProducts = async (): Promise<Product[]> =>
  await fetch('/api/products').then((response) => response.json());

const getAllPaymentMethods = async (): Promise<Payment[]> =>
  await fetch('/api/payment').then((response) => response.json());

const addProduct = async (product: Product): Promise<Response> =>
  await fetch(`/api/product`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

const updateProduct = async (product: Product): Promise<Response> =>
  await fetch(`/api/product/${product._id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

const removeProduct = async (product: Product): Promise<Response> =>
  await fetch(`/api/product/${product._id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

const getAllShipmentMethods = async (): Promise<Delivery[]> =>
  await fetch('/api/shipment').then((response) => response.json());

export {
  getAllProducts,
  addProduct,
  updateProduct,
  removeProduct,
  getAllShipmentMethods,
  getAllPaymentMethods,
};
