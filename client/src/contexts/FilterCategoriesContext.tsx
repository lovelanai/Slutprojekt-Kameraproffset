import { createContext, FC, useContext, useState } from 'react';

export interface ContextValue {
  sony: () => void;
  panasonic: () => void;
  canon: () => void;
  fujifilm: () => void;
  leica: () => void;
  alltypes: () => void;
  systemkamera: () => void;
  kompaktkamera: () => void;
  mellanformatskamera: () => void;
  resetfilter: () => void;
  showFilter: () => void;
  hideFilter: () => void;
  brand: string | undefined;
  type: string | undefined;
  displayFilter: boolean;
}

export const FilterCategoryContext = createContext<ContextValue>({
  sony: () => {},
  panasonic: () => {},
  canon: () => {},
  fujifilm: () => {},
  leica: () => {},
  alltypes: () => {},
  systemkamera: () => {},
  kompaktkamera: () => {},
  mellanformatskamera: () => {},
  resetfilter: () => {},
  showFilter: () => {},
  hideFilter: () => {},
  brand: undefined,
  type: undefined,
  displayFilter: false,
});

const FilterCategoryProvider: FC = (props) => {
  const [brand, setBrand] = useState<string | undefined>();
  const [type, setType] = useState<string | undefined>();
  const [displayFilter, setDisplayFilter] = useState(false);

  const sony = () => {
    setBrand('sony');
  };

  const panasonic = () => {
    setBrand('panasonic');
  };

  const canon = () => {
    setBrand('canon');
  };

  const fujifilm = () => {
    setBrand('fujifilm');
  };

  const leica = () => {
    setBrand('leica');
  };

  const alltypes = () => {
    setType('all');
  };

  const systemkamera = () => {
    setType('systemkamera');
  };

  const kompaktkamera = () => {
    setType('kompaktkamera');
  };

  const mellanformatskamera = () => {
    setType('mellanformatskamera');
  };

  const resetfilter = () => {
    setBrand(undefined);
    setType(undefined);
  };

  const showFilter = () => {
    setDisplayFilter(true);
  };

  const hideFilter = () => {
    setDisplayFilter(false);
    console.log(displayFilter);
  };

  return (
    <FilterCategoryContext.Provider
      value={{
        brand,
        type,
        sony,
        fujifilm,
        canon,
        panasonic,
        leica,
        alltypes,
        systemkamera,
        kompaktkamera,
        mellanformatskamera,
        resetfilter,
        displayFilter,
        showFilter,
        hideFilter,
      }}
    >
      {props.children}
    </FilterCategoryContext.Provider>
  );
};

export default FilterCategoryProvider;

export const FilterContext = () => useContext(FilterCategoryContext);
