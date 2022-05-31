import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminPageForm from './AdminPageForm';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Product } from '../interfaces/interfaces';
import { getProduct } from '../productService';

function AdminEditProductPage() {
  const navigate = useNavigate();
  const location: any = useLocation();
  const { id } = useParams();

  if (location.state?.product) {
    console.log(location.state?.product);
  }

  const [product, setProduct] = useState<Product>(location.state?.product);

  useEffect(() => {
    if (id && product === undefined) {
      getProduct(id).then((p) => setProduct(p));
    }
  }, [id]);

  const goBack = () => {
    navigate('/admin/products');
  };

  return (
    <div className="admin-container">
      <div className="admin-product-form-container">
        <ArrowBackIcon onClick={goBack} className="admin-edit-form-icon" />
        <AdminPageForm product={product} />
      </div>
    </div>
  );
}

export default AdminEditProductPage;
