import { CreateOrderBody } from '../interfaces/interfaces';

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

export { createOrder };
