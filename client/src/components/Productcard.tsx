import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/ShoppingCartContext';
import { Product } from '../interfaces/interfaces';
import ProductAccordion from './ProductAccordion';
import './css/Productcard.css';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import { Box } from '@mui/material';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cartItems, handleAddProduct } = useCart();
  const numberOfProductInCart =
    cartItems.find((p) => p._id === product._id)?.quantity || 0;

  return (
    <Card className="storeCardStyle">
      <Link
        style={{ textDecoration: 'none' }}
        to={product.title.replaceAll(' ', '-')}
      >
        <CardActionArea>
          <div className="ImageContainer">
            <CardMedia
              component="img"
              alt={product.title}
              height="auto"
              image={product.image}
              title={product.title}
            />
          </div>
          <CardContent>
            <div className="InfoContainer">
              <Typography gutterBottom variant="h5" component="h2">
                {product.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                component="ul"
                className="item-short-info"
              >
                <li>{product.info1}</li>
                <li>{product.info2}</li> <li>{product.info3}</li>
              </Typography>
            </div>
            <div className="price">
              <Typography variant="body2" component="p">
                {product.price} SEK
              </Typography>
            </div>
          </CardContent>
        </CardActionArea>
      </Link>
      <ProductAccordion info={product.longinfo} />
      <Box sx={{ padding: '1rem' }}>
        <Typography variant="body2" component="p">
          {product.quantity} i lager
        </Typography>
      </Box>
      <CardActions>
        <div className="buttons">
          <Button
            disabled={numberOfProductInCart >= product.quantity}
            onClick={() => handleAddProduct(product)}
            variant="contained"
            color="secondary"
            size="small"
          >
            Lägg i kundvagn
          </Button>

          <Link to={product.title.replaceAll(' ', '-')}>
            <Button variant="contained" color="primary" size="small">
              Till produkten
            </Button>
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}
