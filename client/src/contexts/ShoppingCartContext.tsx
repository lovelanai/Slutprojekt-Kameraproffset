import { createContext, FC, useContext, useState, useEffect } from 'react';
import { Product } from '../interfaces/interfaces';
import {useLocalStorageState} from "../components/hooks/localstorage";

export interface ContextValue {
  cartItems: Product[];
  amountOfProducts: number;
  handleAddProduct: (product: Product) => void;
  handleRemoveProduct: (product: Product) => void;
  emptyCart: () => void;
  totalPrice: number;
}

export const ShoppingCartContext = createContext<ContextValue>({
  cartItems: [],
  amountOfProducts: 0,
  handleAddProduct: () => {},
  handleRemoveProduct: () => {},
  emptyCart: () => {},
  totalPrice: 0,
});

const ShoppingCartProvider: FC = (props) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [amountOfProducts, setAmountOfProducts] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
 useEffect(() => {
   const items: Product[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
   const amount = items.map((product) => product.quantity).reduce((previous, current) => previous + current, 0);
   setCartItems(items);
   setAmountOfProducts(amount);
 }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log(cartItems)
  }, [cartItems])

  /**
   * This function adds a product to the cartItems-array.
   * If the product already exists, the product's quantity increases by one.
   * @param product This is the product we want to add.
   */
  function HandleAddProduct(product: Product) {


    const productExists = cartItems.find((item) => item._id === product._id);
    // If the product already exist we won't add it to the array again,
    // we will just set its quantity to plus one
    if (productExists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...productExists, quantity: productExists.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    setAmountOfProducts(amountOfProducts + 1);
    setTotalPrice(totalPrice + product.price);

  }

  function emptyCart() {
    setCartItems([]);
    setAmountOfProducts(0);
  }

  /**
   * This function removes a product from the cartItems-array.
   * If the product's quantity is more than one, the product's quantity decreases by one.
   * @param product This is the product we want to remove.
   */
  function handleRemoveProduct(product: Product) {
    const productExists = cartItems.find((item) => item._id === product._id);
    if (!productExists) return;

    if (productExists.quantity === 1) {
      setCartItems(cartItems?.filter((item) => item._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((item) => {
          if (item._id === product._id) {
            return { ...productExists, quantity: productExists.quantity - 1 };
          }
          return item;
        })
      );
    }
    setAmountOfProducts(amountOfProducts - 1);
    setTotalPrice(totalPrice - product.price);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        totalPrice,
        handleAddProduct: HandleAddProduct,
        handleRemoveProduct,
        amountOfProducts,
        emptyCart,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;

export const useCart = () => useContext(ShoppingCartContext);
