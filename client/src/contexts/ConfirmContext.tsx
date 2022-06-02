import { createContext, FC, useContext, useState } from 'react';
import { CreateOrderBody } from '../interfaces/interfaces';
import { ShoppingCartContext } from './ShoppingCartContext';

export interface ContextValue {
  isLoading: boolean;
  confirm: (createOrderBody: CreateOrderBody) => void;
}

export const ConfirmContext = createContext<ContextValue>({
  isLoading: false,
  confirm: (createOrderBody: CreateOrderBody) => {},
});

const ConfirmationProvider: FC = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { emptyCart } = useContext(ShoppingCartContext);

  const confirm = async (createOrderBody: CreateOrderBody) => {
    setIsLoading(true);
    emptyCart();
    setIsLoading(false);
  };

  return (
    <ConfirmContext.Provider value={{ isLoading, confirm }}>
      {props.children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmationProvider;

export const useConfirmation = () => useContext(ConfirmContext);
