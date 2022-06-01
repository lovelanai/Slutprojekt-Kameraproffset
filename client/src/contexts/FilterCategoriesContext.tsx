import { createContext, FC, useContext, useState } from "react";

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
  filter: string;
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
  filter: "",
  cameratype: "",
  displayFilter: false,
});

const FilterCategoryProvider: FC = (props) => {
  const [filter, setFilter] = useState("all");
  const [cameratype, setCameratype] = useState("all");
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

  const alltypes = () => {
    setCameratype("all");
  };

  const systemkamera = () => {
    setCameratype("systemkamera");
  };

  const kompaktkamera = () => {
    setCameratype("kompaktkamera");
  };

  const mellanformatskamera = () => {
    setCameratype("mellanformatskamera");
  };

  const resetfilter = () => {
    setFilter("all");
    setCameratype("all");
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
