import { createContext, FC, useContext, useState } from "react";

export interface ContextValue {
  all: () => void;
  sony: () => void;
  panasonic: () => void;
  canon: () => void;
  fujifilm: () => void;
  leica: () => void;
  systemkamera: () => void;
  kompaktkamera: () => void;
  mellanformatskamera: () => void;
  resetfilter: () => void;
  showFilter: () => void;
  hideFilter: () => void;
  filter: string;
  subfilter: string;
  displayFilter: boolean;
}

export const FilterCategoryContext = createContext<ContextValue>({
  all: () => {},
  sony: () => {},
  panasonic: () => {},
  canon: () => {},
  fujifilm: () => {},
  leica: () => {},
  systemkamera: () => {},
  kompaktkamera: () => {},
  mellanformatskamera: () => {},
  resetfilter: () => {},
  showFilter: () => {},
  hideFilter: () => {},
  filter: "",
  subfilter: "",
  displayFilter: false,
});

const FilterCategoryProvider: FC = (props) => {
  const [filter, setFilter] = useState("all");
  const [subfilter, setSubFilter] = useState("all");
  const [displayFilter, setDisplayFilter] = useState(false);

  const all = () => {
    setFilter("all");
  };

  const sony = () => {
    setFilter("sony");
  };

  const panasonic = () => {
    setFilter("panasonic");
  };

  const canon = () => {
    setFilter("canon");
  };

  const fujifilm = () => {
    setFilter("fujifilm");
  };

  const leica = () => {
    setFilter("leica");
  };

  const systemkamera = () => {
    setSubFilter("systemkamera");
  };

  const kompaktkamera = () => {
    setSubFilter("kompaktkamera");
  };

  const mellanformatskamera = () => {
    setSubFilter("mellanformatskamera");
  };

  const resetfilter = () => {
    setFilter("all");
    setSubFilter("all");
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
        filter,
        subfilter,
        all,
        sony,
        fujifilm,
        canon,
        panasonic,
        leica,
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
