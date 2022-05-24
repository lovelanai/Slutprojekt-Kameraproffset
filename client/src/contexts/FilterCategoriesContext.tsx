import { createContext, FC, useContext, useEffect, useState } from 'react';
import { Product } from '../interfaces/interfaces';
import { getAllProducts } from '../productService';

export interface ContextValue {
  all: () => void;
  sony: () => void;
  panasonic: () => void;
  canon: () => void;
  fujifilm: () => void;
  filter: string;
}

export const FilterCategoryContext = createContext<ContextValue>({
  all: () => {},
  sony: () => {},
  panasonic: () => {},
  canon: () => {},
  fujifilm: () => {},
  filter: '',
});

const FilterCategoryProvider: FC = (props) => {
  const [filter, setFilter] = useState('all');

  const all = () => {
    setFilter('all');
  };

  const sony = () => {
    setFilter('sony');
  };

  const panasonic = () => {
    setFilter('panasonic');
  };

  const canon = () => {
    setFilter('canon');
  };

  const fujifilm = () => {
    setFilter('fujifilm');
  };

  return (
    <FilterCategoryContext.Provider
      value={{ filter, all, sony, fujifilm, canon, panasonic }}
    >
      {props.children}
    </FilterCategoryContext.Provider>
  );
};

export default FilterCategoryProvider;

export const FilterContext = () => useContext(FilterCategoryContext);
