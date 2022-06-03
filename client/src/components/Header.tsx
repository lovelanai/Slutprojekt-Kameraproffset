import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, Button } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../contexts/ShoppingCartContext";
import "./css/Header.css";
import "./ShoppingCartPage.tsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useUser } from "../contexts/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

function Header() {
  const { amountOfProducts } = useContext(ShoppingCartContext);
  const { isLoggedIn, logout, user } = useUser();

  const logoutHandler = (e: any) => {
    e.preventDefault();
    logout();
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <header id="header" className="show-products">
        {!isLoggedIn ? (
          <div>
            <Link to="/login">
              <Button className="loginButton" startIcon={<LoginIcon />}>
                Logga in
              </Button>
            </Link>
          </div>
        ) : (
          <div className="headerButtons">
            {user?.isAdmin === false ? (
              <div className="administrationBtn show-products icon">
                <div>
                  <Button
                    style={{ color: "#fffadd" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <AccountCircleIcon />
                  </Button>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      {" "}
                      <Link to="/myOrders">
                        <Button
                          className="orderBtn"
                          style={{ color: "#FEF9DC" }}
                        >
                          Dina Ordrar
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        className="logoutBtn"
                        style={{ color: "#FEF9DC" }}
                        startIcon={<LogoutIcon />}
                        onClick={logoutHandler}
                      >
                        Logga ut
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ) : null}
            {user?.isAdmin ? (
              <div className="administrationBtn show-products icon">
                <div>
                  <Button
                    style={{ color: "#fffadd" }}
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <AdminPanelSettingsIcon />
                  </Button>

                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <Link to="/admin">
                        <Button style={{ color: "#FEF9DC" }}>
                          Administration
                        </Button>
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Button
                        className="logoutBtn"
                        style={{ color: "#FEF9DC" }}
                        startIcon={<LogoutIcon />}
                        onClick={logoutHandler}
                      >
                        Logga ut
                      </Button>
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            ) : null}
          </div>
        )}

        <img id={"logo"} src={require("../assets/img/logo.png")} alt="logo" />

        <Link to="/">
          <img
            id={"smallLogo"}
            src={require("../assets/img/smallogo.png")}
            alt="logo"
          />
        </Link>

        <Link to="/cart">
          <Badge
            className="icon"
            sx={{ marginRight: "1rem", opacity: "0" }}
            badgeContent={amountOfProducts}
            color="secondary"
          >
            <ShoppingCartIcon sx={{ fontSize: "2rem" }} />
          </Badge>
        </Link>
      </header>
    </ThemeProvider>
  );
}

export default Header;
