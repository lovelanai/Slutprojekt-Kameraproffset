import { createContext, FC, useContext, useState } from "react";

export interface ContextValue {
  all: () => void;
  sony: () => void;
  panasonic: () => void;
  canon: () => void;
  fujifilm: () => void;
  leica: () => void;
  filter: string;
}

export const FilterCategoryContext = createContext<ContextValue>({
  all: () => {},
  sony: () => {},
  panasonic: () => {},
  canon: () => {},
  fujifilm: () => {},
  leica: () => {},
  filter: "",
});

const FilterCategoryProvider: FC = (props) => {
  const [filter, setFilter] = useState("all");

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

  return (
    <FilterCategoryContext.Provider
      value={{ filter, all, sony, fujifilm, canon, panasonic, leica }}
    >
      {props.children}
    </FilterCategoryContext.Provider>
  );
};

export default FilterCategoryProvider;

export const FilterContext = () => useContext(FilterCategoryContext);
