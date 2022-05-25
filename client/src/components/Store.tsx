import ImgMediaCard from "./Productcard";
import FilterBar from "./FilterBar";

function Store() {
  return (
    <div>
      <div
        style={{
          marginTop: "-4rem",
          background: "#f9f9f9",
          position: "fixed",
          width: "100%",
          zIndex: "3",
          marginBottom: "1rem",
        }}
      >
        <FilterBar />
      </div>
      <ImgMediaCard />;
    </div>
  );
}

export default Store;
