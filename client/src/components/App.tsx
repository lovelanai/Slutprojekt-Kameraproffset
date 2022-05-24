import { BrowserRouter } from 'react-router-dom';
import ShoppingCartProvider from '../contexts/ShoppingCartContext';
import Layout from './Layout';
import ConfirmationProvider from '../contexts/ConfirmationContext';
import UserProvider from '../contexts/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ShoppingCartProvider>
          <ConfirmationProvider>
            <Layout />
          </ConfirmationProvider>
        </ShoppingCartProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
