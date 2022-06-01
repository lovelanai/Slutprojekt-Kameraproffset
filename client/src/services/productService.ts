import { Delivery, Order, Payment, Product } from '../interfaces/interfaces';

const getAllProducts = async (): Promise<Product[]> =>
  fetch('/api/products').then((response) => response.json());

const getProduct = async (id: string): Promise<Product> =>
  fetch(`/api/product/${id}`).then((response) => response.json());

const getAllPaymentMethods = async (): Promise<Payment[]> =>
  fetch('/api/payment').then((response) => response.json());

const addProduct = async (product: Product): Promise<Response> =>
  fetch(`/api/product`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

const updateProduct = async (product: Product): Promise<Response> =>
  fetch(`/api/product/${product._id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

const removeProduct = async (product: Product): Promise<Response> =>
  fetch(`/api/product/${product._id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

const getAllShipmentMethods = async (): Promise<Delivery[]> =>
  fetch('/api/shipment').then((response) => response.json());

export {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
  getAllShipmentMethods,
  getAllPaymentMethods,
};
