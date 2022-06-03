import { useEffect, useState } from "react";
import ProductCard from "./Productcard";
import FilterBar from "./FilterBar";
import { FilterContext } from "../contexts/FilterCategoriesContext";
import { Product } from "../interfaces/interfaces";
import { getAllProducts } from "../services/productService";
import "./css/Store.css";
import SearchIcon from "@mui/icons-material/Search";

import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
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
        <div className="store-container">
          <div className="filter-bar">
            <FilterBar />
          </div>
          <div>
            {products.length < 1 ? (
              <div
                className="ProductContainer"
                style={{ minHeight: "calc(100vh - 9rem)" }}
              >
                <div>
                  <p>inga produkter finns</p>
                </div>
              </div>
            ) : (
              <div className="ProductContainer">
                {products.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ position: "relative" }}>
          <Button
            onClick={showFilter}
            style={{
              position: "fixed",
              left: "0",
              top: "6rem",
              zIndex: "3",
              color: "#333333",
            }}
          >
            <MenuIcon />
            Filter
          </Button>
          <div>
            {products.length < 1 ? (
              <div className="ProductContainer">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      background: "#333333",
                      height: "10rem",
                      width: "14rem",
                      borderRadius: "1rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p style={{ color: "white" }}>
                      Det finns inga produkter med valt filter
                    </p>
                    <p style={{ color: "white" }}>
                      <SearchIcon />
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="ProductContainer">
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
