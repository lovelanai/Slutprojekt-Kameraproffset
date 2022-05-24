import ImgMediaCard from './Productcard';
import FilterBar from './FilterBar';

function Store() {
  return (
    <div>
      <div style={{ marginTop: '6rem' }}>
        <FilterBar />
      </div>
      <ImgMediaCard />;
    </div>
  );
}

export default Store;
