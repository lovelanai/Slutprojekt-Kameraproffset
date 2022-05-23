import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import './css/Header.css';
import './ShoppingCartPage.tsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      contrastText: '#FBF7F5', //button text white instead of black
    },
    background: {
      default: '#333333',
    },

    secondary: {
      main: '#DA344D',
    },
  },
});

function Header() {
  const { amountOfProducts } = useContext(ShoppingCartContext);
  return (
    <ThemeProvider theme={theme}>
      <header id="header" className="show-products">
        <Link to="/LoginPage">
          <AdminPanelSettingsIcon
            className="icon"
            sx={{ paddingLeft: '1rem', fontSize: '2rem', opacity: '0' }}
          />
        </Link>

        <img id={'logo'} src={require('../assets/img/logo.png')} alt="logo" />

        <Link to="/">
          <img
            id={'smallLogo'}
            src={require('../assets/img/smallogo.png')}
            alt="logo"
          />
        </Link>
        <Link to="/ShoppingCartPage">
          <Badge
            className="icon"
            sx={{ marginRight: '1rem', opacity: '0' }}
            badgeContent={amountOfProducts}
            color="secondary"
          >
            <ShoppingCartIcon sx={{ fontSize: '2rem' }} />
          </Badge>
        </Link>
      </header>
    </ThemeProvider>
  );
}

export default Header;
