import { useEffect, useState } from 'react';
import { Order } from '../interfaces/interfaces';
import { getAllOrders } from '../productService';
import OrderAccoridion from './OrderAccordion';

function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getAllOrders().then((order) => setOrders(order));
  }, []);

  return (
    <div style={{ background: '#999', padding: '5ex 0' }}>
      {orders.map((order, index) => (
        <OrderAccoridion order={order}></OrderAccoridion>
      ))}
    </div>
  );
}

export default AdminOrderPage;
