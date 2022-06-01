import { createContext, FC, useContext, useState } from 'react';

export interface ContextValue {
  all: () => void;
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
  brand: string;
  cameratype: string;
  displayFilter: boolean;
}

export const FilterCategoryContext = createContext<ContextValue>({
  all: () => {},
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
  brand: '',
  cameratype: '',
  displayFilter: false,
});

const FilterCategoryProvider: FC = (props) => {
  const [brand, setBrand] = useState('all');
  const [cameratype, setCameratype] = useState('all');
  const [displayFilter, setDisplayFilter] = useState(false);

  const all = () => {
    setBrand('all');
  };

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
    setCameratype('all');
  };

  const systemkamera = () => {
    setCameratype('systemkamera');
  };

  const kompaktkamera = () => {
    setCameratype('kompaktkamera');
  };

  const mellanformatskamera = () => {
    setCameratype('mellanformatskamera');
  };

  const resetfilter = () => {
    setBrand('all');
    setCameratype('all');
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
        cameratype,
        all,
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
