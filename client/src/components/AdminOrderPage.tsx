import { useEffect, useState } from 'react';
import { Order } from '../interfaces/interfaces';
import { getAllOrders } from '../productService';

function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getAllOrders().then((order) => setOrders(order));
  }, []);

  return (
    <div>
      {orders.map((item, index) => (
        <div
          style={{ margin: '1rem', padding: '1rem', border: '1px solid black' }}
          key={index}
        >
          <ul>
            <li>
              <p>Användare: {item.user.email}</p>
            </li>
          </ul>

          <div>Email: {item.email}</div>
          <p>Telefon: {item.phoneNumber}</p>
          <div>
            <ul>
              {item.products?.map((products, index) => (
                <li key={index}>
                  <p>Titel: {products.title}</p>
                  <p>Longinfo: {products.longinfo}</p>
                  <p>info1: {products.info1}</p>
                  <p>info2: {products.info2}</p>
                  <p>info3: {products.info3}</p>
                  <p>Pris: {products.price}</p>
                  <p>Antal: {products.quantity}</p>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <p>Gata: {item.deliveryAddress.street}</p>
                <p>Postnummer: {item.deliveryAddress.zipcode}</p>
                <p>Förnamn: {item.deliveryAddress.firstname}</p>
                <p>Efternamn: {item.deliveryAddress.lastname}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p>Titel: {item.payment.title}</p>
                <p>Pris: {item.payment.price}</p>
                <p>Info: {item.payment.info}</p>
              </li>
            </ul>
            <ul>
              <li>
                <p>Titel: {item.shipment.title}</p>
                <p>Pris: {item.shipment.price}</p>
                <p>Info: {item.shipment.info}</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrderPage;
