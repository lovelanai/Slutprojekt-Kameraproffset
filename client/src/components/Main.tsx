import { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Product } from '../interfaces/interfaces';
import { getAllProducts } from '../productService';
import AdminPage from './AdminPage';
import CheckOut from './CheckOutPage';
import ProductInfo from './Productinfo';
import ShoppingCartPage from './ShoppingCartPage';
import Store from './Store';
import SignUpForm from './SignUpForm';
import LoginPage from './LoginPage';
import Confirmation from './Confirmation';
import { useUser } from '../contexts/UserContext';

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
          <Route path="/AdminPage" element={<AdminPage />} />
        ) : null}
        <Route path="/ShoppingCartPage" element={<ShoppingCartPage />} />
        <Route path="/Register" element={<SignUpForm />} />
        <Route path="/LoginPage" element={<LoginPage />} />
        <Route path="/CheckOut" element={<CheckOut />} />
        <Route path="/Confirmation/:customerName" element={<Confirmation />} />

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
