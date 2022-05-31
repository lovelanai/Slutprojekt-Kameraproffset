import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Product } from '../interfaces/interfaces';
import { getAllProducts } from '../productService';
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

function Main() {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useUser();

  useEffect(() => {
    getAllProducts().then((p) => setProducts(p));
  }, []);

  return (
    <main style={{ background: 'white' }}>
      <Routes>
        <Route path="/" element={<Store />} />
        {user?.isAdmin ? (
          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<AdminProductPage />}></Route>
            <Route path="product" element={<AdminEditProductPage />}></Route>
            <Route
              path="product/:id"
              element={<AdminEditProductPage />}
            ></Route>
            <Route path="products" element={<AdminProductPage />}></Route>
            <Route path="orders" element={<AdminOrderPage />}></Route>
          </Route>
        ) : null}
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/confirmation/:customerName" element={<Confirmation />} />

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
