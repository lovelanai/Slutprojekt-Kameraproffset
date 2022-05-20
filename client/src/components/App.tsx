import { BrowserRouter } from "react-router-dom";
import ProductProvider from "../contexts/ProductContext";
import ShoppingCartProvider from "../contexts/ShoppingCartContext";
import Layout from "./Layout";
import ConfirmationProvider from "../contexts/confirmationContext";
import UserProvider from "../contexts/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <ShoppingCartProvider>
            <ConfirmationProvider>
              <Layout />
            </ConfirmationProvider>
          </ShoppingCartProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
