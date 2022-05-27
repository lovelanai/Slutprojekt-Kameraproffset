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
import { getAllProducts } from '../productService';
import ProductAccordion from './ProductAccordion';
import './css/Productcard.css';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import {useLocalStorageState} from "./hooks/localstorage";

export default function ImgMediaCard(): JSX.Element {
  const { filter } = FilterContext();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((p) => {
      const results = p.filter((product) => product.category.includes(filter));
      setProducts(results);
    });

    console.log(filter);
  }, [filter]);


  const { handleAddProduct } = useCart();

  return (
    <div className="ProductContainer">
      {products.map((item, index) => (
        <Card className="storeCardStyle" key={index}>
          <Link
            style={{ textDecoration: 'none' }}
            to={item.title.replaceAll(' ', '-')}
          >
            <CardActionArea>
              <div className="ImageContainer">
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="auto"
                  image={item.image}
                  title={item.title}
                />
              </div>
              <CardContent>
                <div className="InfoContainer">
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="ul"
                    className="item-short-info"
                  >
                    <li>{item.info1}</li>
                    <li>{item.info2}</li> <li>{item.info3}</li>
                  </Typography>
                </div>
                <div className="price">
                  <Typography variant="body2" component="p">
                    {item.price} SEK
                  </Typography>
                </div>
              </CardContent>
            </CardActionArea>
          </Link>
          <ProductAccordion info={item.longinfo} />
          <CardActions>
            <div className="buttons">
              <Button
                onClick={() => handleAddProduct(item)}
                variant="contained"
                color="secondary"
                size="small"
              >
                Lägg i kundvagn
              </Button>

              <Link to={item.title.replaceAll(' ', '-')}>
                <Button variant="contained" color="primary" size="small">
                  Till produkten
                </Button>
              </Link>
            </div>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
