import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Product } from '../interfaces/interfaces';
import { getAllProducts, removeProduct } from '../services/productService';
import { useNavigate } from 'react-router-dom';
import { deleteMedia } from '../services/mediaService';

function AdminProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  const handleRemoveProduct = async (product: Product) => {
    const deletionPromises = product.images.map((image) => deleteMedia(image));

    deletionPromises.push(removeProduct(product));

    await Promise.all(deletionPromises);

    setProducts(products.filter((p) => p._id !== product._id));
  };

  const sendToEdit = (product?: Product) => {
    const productId = product?._id ?? '';
    navigate(`/admin/product/${productId}`, { state: { product } });
  };

  useEffect(() => {
    getAllProducts().then((p) => setProducts(p));
  }, []);

  return (
    <>
      <div className="admin-edit-button">
        <Button
          onClick={() => sendToEdit()}
          variant="contained"
          size="large"
          color="primary"
        >
          Lägg till produkt
        </Button>
      </div>
      <div className="admin-container">
        <div>
          {products.map((item, index) => (
            <div key={index} className="admin-product-container">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  style={{ margin: '1rem' }}
                  variant="contained"
                  onClick={() => sendToEdit(item)}
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
                <Button
                  style={{ margin: '1rem' }}
                  color="secondary"
                  variant="contained"
                  onClick={() => handleRemoveProduct(item)}
                  startIcon={<DeleteForeverIcon />}
                >
                  Remove
                </Button>
              </div>
              <h2>Title: {item.title}</h2>
              <p style={{ paddingLeft: '1rem' }}>ID: {item._id}</p>
              <div className="admin-image-container">
                {item.images.map((image, index) => (
                  <img
                    key={index}
                    className="admin-image"
                    src={`/api/media/${image}`}
                    alt=""
                  />
                ))}
              </div>
              <div className="admin-info-container">
                <p>Price: {item.price}</p>
                <p>Long info: {item.longinfo}</p>
                <ul>
                  {item.info.map((info, index) => (
                    <li key={index}>
                      Short info {index + 1}: {info}
                    </li>
                  ))}
                </ul>

                <ul>
                  {item.specifications?.map((spec, index) => (
                    <li key={index}>
                      <p>{spec.title}</p>
                      <p>{spec.value}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminProductPage;
