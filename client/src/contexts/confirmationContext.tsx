import { createContext, FC, useContext, useState } from 'react';
import { CreateOrderBody } from '../interfaces/interfaces';
import { ShoppingCartContext } from './ShoppingCartContext';

export interface ContextValue {
  isLoading: boolean;
  confirm: (createOrderBody: CreateOrderBody) => void;
}

export const ConfirmationContext = createContext<ContextValue>({
  isLoading: false,
  confirm: (createOrderBody: CreateOrderBody) => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { emptyCart } = useContext(ShoppingCartContext);

  const confirm = async (createOrderBody: CreateOrderBody) => {
    setIsLoading(true);

    await fetch('/api/order', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createOrderBody),
    });

    emptyCart();
    setIsLoading(false);
  };

  return (
    <ConfirmationContext.Provider value={{ isLoading, confirm }}>
      {props.children}
    </ConfirmationContext.Provider>
  );
};

export default ConfirmationProvider;

export const useConfirmation = () => useContext(ConfirmationContext);
