import { BrowserRouter } from 'react-router-dom';
import ShoppingCartProvider from '../contexts/ShoppingCartContext';
import Layout from './Layout';
import ConfirmationProvider from '../contexts/ConfirmContext';
import UserProvider from '../contexts/UserContext';
import FilterCategoryContext from '../contexts/FilterCategoriesContext';
import ErrorProvider from '../contexts/ErrorContext';

function App() {
  return (
    <BrowserRouter>
      <ErrorProvider>
        <UserProvider>
          <FilterCategoryContext>
            <ShoppingCartProvider>
              <ConfirmationProvider>
                <Layout />
              </ConfirmationProvider>
            </ShoppingCartProvider>
          </FilterCategoryContext>
        </UserProvider>
      </ErrorProvider>
    </BrowserRouter>
  );
}

export default App;
