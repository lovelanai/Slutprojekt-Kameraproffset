import ImgMediaCard from "./Productcard";
import FilterBar from "./FilterBar";

import { FilterContext } from "../contexts/FilterCategoriesContext";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
function Store() {
  const { showFilter, displayFilter } = FilterContext();
  return (
    <div>
      {displayFilter ? (
        <div>
          <div className="filter-bar">
            <FilterBar />
          </div>
          <ImgMediaCard />;
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <Button
            onClick={showFilter}
            style={{ position: "fixed", left: "0", top: "6rem", zIndex: "10" }}
          >
            <MenuIcon />
            Filter
          </Button>
          <ImgMediaCard />;
        </div>
      )}
    </div>
  );
}

export default Store;
