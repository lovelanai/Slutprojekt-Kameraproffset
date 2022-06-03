import { Order } from "../interfaces/interfaces";
import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";
import OrderAccordion from "./OrderAccordion";
import "./css/MyOrders.css";

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getMyOrders().then((order) => setOrders(order));
  }, []);

  return (
    <div className="myOrderContainer">
      <h3 style={{ margin: "2rem" }}>Dina ordrar</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column-reverse",
        }}
      >
        {orders.map((order, index) => (
          <div className="myOrders" key={index}>
            <OrderAccordion order={order} />
          </div>
        ))}
      </div>
    </div>
  );
}
