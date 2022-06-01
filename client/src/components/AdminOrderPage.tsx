import { useEffect, useState } from "react";
import { Order } from "../interfaces/interfaces";
import { getAllOrders } from "../services/productService";
import OrderAccoridion from "./OrderAccordion";

function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getAllOrders().then((order) => setOrders(order));
  }, []);

  return (
    <div style={{ background: "#999", padding: "5ex 0" }}>
      {orders.map((order, index) => (
        <div className="orders">
          <OrderAccoridion order={order}></OrderAccoridion>
        </div>
      ))}
    </div>
  );
}

export default AdminOrderPage;
