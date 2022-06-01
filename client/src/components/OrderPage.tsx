import { useEffect, useState } from 'react';
import { Order } from '../interfaces/interfaces';
import { getMyOrders } from '../services/orderService';
import OrderAccoridion from './OrderAccordion';

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getMyOrders().then((order) => setOrders(order));
  }, []);

  return (
    <div style={{ background: '#999', padding: '5ex 0' }}>
      {orders.map((order, index) => (
        <div key={index} className="orders">
          <OrderAccoridion order={order}></OrderAccoridion>
        </div>
      ))}
    </div>
  );
}
