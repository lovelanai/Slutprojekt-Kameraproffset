import { BrowserRouter } from 'react-router-dom';
import ShoppingCartProvider from '../contexts/ShoppingCartContext';
import Layout from './Layout';
import ConfirmationProvider from '../contexts/ConfirmationContext';
import UserProvider from '../contexts/UserContext';
import FilterCategoryContext from '../contexts/FilterCategoriesContext';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <FilterCategoryContext>
          <ShoppingCartProvider>
            <ConfirmationProvider>
              <Layout />
            </ConfirmationProvider>
          </ShoppingCartProvider>
        </FilterCategoryContext>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
