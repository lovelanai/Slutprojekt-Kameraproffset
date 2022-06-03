import { useEffect, useState } from 'react';
import { Order } from '../interfaces/interfaces';
import { getAllOrders } from '../services/orderService';
import OrderAccordion from './OrderAccordion';

export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getAllOrders().then((order) => setOrders(order));
  }, []);

  const updateOrder = (index: number, order: Order) => {
    const newOrders = [...orders];
    newOrders[index] = order;
    setOrders(newOrders);
    console.log(order);
  };

  return (
    <div style={{ background: '#999', padding: '5ex 0' }}>
      {orders.map((order, index) => (
        <div key={index} className="orders">
          <OrderAccordion
            order={order}
            admin={true}
            updateOrder={(order) => updateOrder(index, order)}
          />
        </div>
      ))}
    </div>
  );
}
