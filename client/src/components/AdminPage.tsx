import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button, createTheme, Link, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { Product } from '../interfaces/interfaces';
import './css/AdminPage.css';
import AdminPageForm from './AdminPageForm';
import LoginForm from './LoginForm';
import { getAllProducts, removeProduct } from '../productService';
import { style } from '@mui/system';
import AdminOrderPage from './AdminOrderPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#333333',
      contrastText: '#FBF7F5', //button text white instead of black
    },
    background: {
      default: '#333333',
    },

    secondary: {
      main: '#DA344D',
    },
  },
});

function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editForm, setEditForm] = useState(false);
  const [activeProduct, setActiveProduct] = useState<Product>();
  const [showOrders, setShowOrders] = useState(false);

  const handleRemoveProduct = (product: Product) => {
    removeProduct(product);
    setProducts(products.filter((p) => p._id !== product._id));
  };

  const sendToEdit = (product?: Product) => {
    setActiveProduct(product);
    setEditForm(true);
    setShowOrders(false);
  };

  const displayOrders = () => {
    setShowOrders(true);
  };

  //behövs denna??
  useEffect(() => {
    getAllProducts().then((p) => setProducts(p));
  }, []);

  if (!editForm) {
    return (
      <ThemeProvider theme={theme}>
        <div className="admin-top-container">
          {!showOrders ? (
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
          ) : (
            <></>
          )}
          <div>
            {/* <Link to="AdminOrderPage"> */}
            <Button onClick={displayOrders}>Ordrar</Button>
            {/* </Link> */}
          </div>
          {showOrders ? (
            <div>
              <ArrowBackIcon
                onClick={() => setShowOrders(false)}
                className="admin-edit-form-icon"
              />

              <div>
                <AdminOrderPage />
              </div>
            </div>
          ) : (
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
                      <img className="admin-image" src={item.image} alt="" />
                      <img className="admin-image" src={item.image2} alt="" />
                      <img className="admin-image" src={item.image3} alt="" />
                    </div>
                    <div className="admin-info-container">
                      <p>Price: {item.price}</p>
                      <p>Long info: {item.longinfo}</p>
                      <ul>
                        <li>Short info 1: {item.info1}</li>
                        <li>Short info 2: {item.info2}</li>
                        <li>Short info 3: {item.info3}</li>
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
          )}
        </div>
      </ThemeProvider>
    );
  } else {
    return (
      <div className="admin-container">
        <div className="admin-product-form-container">
          <ArrowBackIcon
            onClick={() => setEditForm(false)}
            className="admin-edit-form-icon"
          />
          <AdminPageForm product={activeProduct} />
        </div>
      </div>
    );
  }
}

export default AdminPage;
