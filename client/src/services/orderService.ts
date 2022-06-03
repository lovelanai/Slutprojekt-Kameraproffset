import { CreateOrderBody, Order } from '../interfaces/interfaces';

const createOrder = async (
  createOrderBody: CreateOrderBody
): Promise<Response> =>
  fetch('/api/order', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createOrderBody),
  });

const getAllOrders = async (): Promise<Order[]> =>
  fetch('/api/allorders').then((response) => response.json());

const getMyOrders = async (): Promise<Order[]> =>
  fetch('/api/myorders').then((response) => response.json());

const markOrderAsSent = async (
  order: Order,
  sent: Boolean
): Promise<Response> =>
  fetch(`/api/order/send/${order._id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sent }),
  });

export { createOrder, getAllOrders, getMyOrders, markOrderAsSent };
