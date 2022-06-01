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
  const { brand, type } = FilterContext();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then((p) => {
      const filteredProducts = p.filter(
        (product) =>
          (brand ? product.category.brand === brand : true) &&
          (type ? product.category.type === type : true)
      );

      setProducts(filteredProducts);
    });
  }, [type, brand]);

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
            style={{
              position: 'fixed',
              left: '0',
              top: '6rem',
              zIndex: '3',
              color: '#333333',
            }}
          >
            <MenuIcon />
            Filter
          </Button>
          <div className="ProductContainer">
            {products.length < 1 ? (
              <div>inga produkter finns</div>
            ) : (
              <div>
                {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Store;
