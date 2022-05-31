import { useEffect, useState } from 'react';
import ProductCard from './Productcard';
import FilterBar from './FilterBar';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import { Product } from '../interfaces/interfaces';
import { getAllProducts } from '../services/productService';
import './css/Store.css';

import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
function Store() {
  const { showFilter, displayFilter } = FilterContext();
  const { filter } = FilterContext();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((p) => {
      const results = p.filter((product) => product.category.includes(filter));
      setProducts(results);
    });

    console.log(filter);
  }, [filter]);

  return (
    <div>
      {displayFilter ? (
        <div>
          <div className="filter-bar">
            <FilterBar />
          </div>
          <div className="ProductContainer">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <Button
            onClick={showFilter}
            style={{ position: 'fixed', left: '0', top: '6rem', zIndex: '10' }}
          >
            <MenuIcon />
            Filter
          </Button>
          <div className="ProductContainer">
            {products.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
