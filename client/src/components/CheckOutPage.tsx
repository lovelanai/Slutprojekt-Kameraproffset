import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import CheckOutAccordion from './CheckOutAccordion';
import './css/CheckOutPage.css';
import { useUser } from '../contexts/UserContext';

function CheckOut() {
  const { isLoggedIn } = useUser();
  return (
    <div className="checkout-container">
      <Link to="/ShoppingCartPage">
        <ArrowBackIcon sx={{ fontSize: '2.2rem' }} className="back-arrow" />
      </Link>
      {!isLoggedIn ? (
        <div>
          <div> du måste vara inloggad för att checka ut</div>
          <Link to="/LoginPage">Logga in/Skapa användare</Link>
        </div>
      ) : (
        <CheckOutAccordion></CheckOutAccordion>
      )}
    </div>
  );
}

export default CheckOut;
