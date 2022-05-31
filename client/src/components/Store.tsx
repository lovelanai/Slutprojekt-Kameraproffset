import { useEffect, useState } from 'react';
import ProductCard from './Productcard';
import FilterBar from './FilterBar';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import { Product } from '../interfaces/interfaces';
import { getAllProducts } from '../services/productService';
import './css/Store.css';

function Store() {
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
      <div
        style={{
          marginTop: '-4rem',
          background: '#f9f9f9',
          position: 'fixed',
          width: '100%',
          zIndex: '3',
          marginBottom: '1rem',
        }}
      >
        <FilterBar />
      </div>
      <div className="ProductContainer">
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Store;
