import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Product } from '../interfaces/interfaces';
import { getAllProducts } from '../services/productService';
import AdminPage from './AdminPage';
import AdminProductPage from './AdminProductPage';
import AdminOrderPage from './AdminOrderPage';
import CheckOut from './CheckOutPage';
import ProductInfo from './Productinfo';
import ShoppingCartPage from './ShoppingCartPage';
import Store from './Store';
import SignUpForm from './SignUpForm';
import LoginPage from './LoginPage';
import Confirmation from './Confirmation';
import { useUser } from '../contexts/UserContext';
import AdminEditProductPage from './AdminEditProductPage';
import OrderPage from './OrderPage';
import MyOrders from './MyOrders'


function Main() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUser();

  useEffect(() => {
    getAllProducts().then((p) => setProducts(p));
  }, []);

  return (
    <main style={{ background: 'white', marginTop: '6rem' }}>
      <Routes>
        <Route path="/" element={<Store />} />


        {user?.isAdmin ? (
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminProductPage />}/>
            <Route path="product" element={<AdminEditProductPage />}/>
            <Route
              path="product/:id"
              element={<AdminEditProductPage />}/>

            <Route path="products" element={<AdminProductPage />}/>
            <Route path="orders" element={<AdminOrderPage />}/>
          </Route>
        ) : null}
        <Route path="/orders" element={<OrderPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/confirmation/:customerName" element={<Confirmation />} />
        <Route path="/myOrders" element={<MyOrders />}/>

        {products.map((item, index) => (
          <Route
            key={index}
            path={item.title.replaceAll(' ', '-')}
            element={<ProductInfo product={item} />}
          />
        ))}
      </Routes>
    </main>
  );
}

export default Main;
