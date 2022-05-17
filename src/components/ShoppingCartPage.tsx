import { ThemeProvider } from "@emotion/react";
import { Button, createTheme } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import CartItem from "./CartItem";
import "./ShoppingCart.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333333",
      contrastText: "#FBF7F5", //button text white instead of black
    },
    background: {
      default: "#333333",
    },

    secondary: {
      main: "#DA344D",
    },
  },
});

function ShoppingCartPage() {
  const { cartItems } = useContext(ShoppingCartContext);
  const { amountOfProducts } = useContext(ShoppingCartContext);

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="containerStyle">
          <div className="cart-container">
            <div className="cart">
              <div className="cart-left">
                <div className="CartHeader">
                  <h1 className="header-font">Varukorg</h1>
                </div>
                <CartItem />
              </div>
              <div className="cart-right">
                <div className="orderSummary">
                  <h1 className="header-font">Översikt</h1>
                </div>
                <div className="items">
                  <h3>Produkter</h3>
                  <span>{amountOfProducts}</span>
                </div>
                <div className="total">
                  <h3>Total</h3>

                  <span>{totalCost}:-</span>
                  <div className="confirm-button">
                    {cartItems.length > 0 ? (
                      <Link to="/checkOut">
                        <Button
                          disabled={false}
                          variant="contained"
                          size="small"
                        >
                          Checka ut
                        </Button>
                      </Link>
                    ) : (
                      <Button disabled={true} variant="contained" size="small">
                        Checka ut
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ShoppingCartPage;
