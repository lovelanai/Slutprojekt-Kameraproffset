import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { useContext } from 'react';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import './css/CheckoutItems.css';
import './ShoppingCart.css';

export default function CheckOutItems(): JSX.Element {
  const { cartItems } = useContext(ShoppingCartContext);

  return (
    <div>
      <div>
        {cartItems.map((item, index) => (
          <div key={index}>
            <Card className="cardContainer">
              <div className="image">
                <h1>{item.title}</h1>
                <CardMedia
                  className="Img"
                  component="img"
                  alt={item.title}
                  height="auto"
                  image={item.images[0]}
                  title={item.title}
                />
              </div>

              <div className="productInfo">
                <CardContent></CardContent>
                <CardActions>
                  <Typography>{item.quantity} st</Typography>
                </CardActions>
                <Typography>{item.quantity * item.price}:- </Typography>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
