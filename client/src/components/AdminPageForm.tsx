import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  createTheme,
  ButtonGroup,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterContext } from '../contexts/FilterCategoriesContext';
import { Product } from '../interfaces/interfaces';
import { addProduct, updateProduct } from '../services/productService';

interface Props {
  product?: Product;
}

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

export default function AdminPageForm(props: Props) {
  const navigate = useNavigate();

  const initialValues = {
    _id: props?.product?._id || '',
    title: props?.product?.title || '',
    longinfo: props?.product?.longinfo || '',
    info1: props?.product?.info1 || '',
    info2: props?.product?.info2 || '',
    info3: props?.product?.info3 || '',
    price: props?.product?.price || '',
    quantity: props?.product?.quantity || 0,
    image: props?.product?.image || '',
    image2: props?.product?.image2 || '',
    image3: props?.product?.image3 || '',
    category: props?.product?.category ?? ['all'],
    specifications: props?.product?.specifications ?? [],
  };

  const initialErrors = {
    title: false,
    longinfo: false,
    info1: false,
    info2: false,
    info3: false,
    quantity: false,
    price: false,
    image: false,
    image2: false,
    image3: false,
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [value, setValue] = useState(initialValues);
  const [errorInput, setErrorInput] = useState(initialErrors);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setValue(initialValues);
  }, [props.product]);

  // brand-category
  const toggleCategory = (category: string) => {
    if (category in value.category!) {
      setValue({
        ...value,
        category: value.category!.filter((c) => c !== category),
      });
    } else {
      setValue({
        ...value,
        category: [...value.category!, category],
      });
    }
  };

  const handleAddProduct = async (product: Product): Promise<Response> => {
    if (props?.product) {
      return await updateProduct(product);
    } else {
      return await addProduct(product);
    }
  };

  const addedProductMessage = () => {
    handleOpen();
    setTimeout(handleClose, 1200);
  };

  const addSpecification = () => {
    const specifications = value.specifications ?? [];
    specifications.push({
      title: '',
      value: '',
    });

    setValue({ ...value, specifications });
  };

  const handleSpecChange = (
    specIndex: number,
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const specifications = value.specifications ?? [];
    specifications[specIndex] = {
      ...specifications[specIndex],
      [evt.target.name]: evt.target.value,
    };

    setValue({
      ...value,
      specifications,
    });
  };

  const handleChange = (
    evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrorInput({
      ...errorInput,
      [evt.target.name]: evt.target.value.length === 0,
    });

    /**This if-statement checks if the name of the target is price, if true, then it checks
     * if it includes anything else than numbers.
     */
    if (evt.target.name === 'price') {
      if (!/^\d*$/.test(evt.target.value)) {
        setErrorInput({
          ...errorInput,
          [evt.target.name]: true,
        });
      } else
        setErrorInput({
          ...errorInput,
          [evt.target.name]: false,
        });
    }

    setValue({
      ...value,
      [evt.target.name]: evt.target.value,
    });
  };

  const sendToAddProduct = () => {
    const product: Product = {
      _id: props?.product?._id ?? undefined,
      title: value.title!,
      longinfo: value.longinfo!,
      info1: value.info1!,
      info2: value.info2!,
      info3: value.info3!,
      price: Number(value.price),
      quantity: Number(value.quantity),
      image: value.image!,
      image2: value.image2!,
      image3: value.image3!,
      category: value.category!,
      specifications: value.specifications!,
    };

    handleAddProduct(product)
      .then((response) => addedProductMessage())
      .catch((error) => console.log(error));
  };

  const areAllFieldsFilled = () => {
    if (
      value.title?.length &&
      value.price?.toString().length &&
      value.longinfo?.length &&
      value.image?.length &&
      value.image2?.length &&
      value.image3?.length &&
      value.info1?.length &&
      value.info2?.length &&
      value.info3?.length &&
      value.quantity?.toString().length
    ) {
      return false;
    } else return true;
  };

  const [alignment, setAlignment] = useState('web');

  const handleToggleButton = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            marginTop: 2,
            marginBottom: 2,
            width: '100%',
          },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            multiline
            maxRows={4}
            id="outlined-Titel"
            label="Titel"
            name="title"
            error={Boolean(errorInput.title)}
            onChange={handleChange}
            value={value.title}
            helperText={
              errorInput.title
                ? 'Titeln måste vara minst ett tecken'
                : 'Produktens titel'
            }
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              required
              id="outlined-number"
              label="Price"
              name="price"
              onChange={handleChange}
              error={Boolean(errorInput.price)}
              value={value.price}
              helperText={
                errorInput.price
                  ? 'Produktens pris får endast innehålla siffror'
                  : 'Produktens pris'
              }
            />
          </div>
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Image1"
            onChange={handleChange}
            label="Image1"
            name="image"
            error={Boolean(errorInput.image)}
            value={value.image}
            helperText={
              errorInput.image ? 'Skriv in en URL' : 'Produktens bild URL 1'
            }
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Image2"
            value={value.image2}
            onChange={handleChange}
            error={Boolean(errorInput.image2)}
            label="Image2"
            name="image2"
            helperText={
              errorInput.image2 ? 'Skriv in en URL' : 'Produktens bild URL 2'
            }
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Image3"
            label="Image3"
            name="image3"
            onChange={handleChange}
            error={Boolean(errorInput.image3)}
            value={value.image3}
            helperText={
              errorInput.image3 ? 'Skriv in en URL' : 'Produktens bild URL 3'
            }
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="Outlined-longinfo"
            label="Long info"
            name="longinfo"
            onChange={handleChange}
            error={Boolean(errorInput.longinfo)}
            helperText={
              errorInput.longinfo
                ? 'Produktinfo får inte vara tom'
                : 'Produktens långa info'
            }
            value={value.longinfo}
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Info1"
            label="Info1"
            name="info1"
            onChange={handleChange}
            error={Boolean(errorInput.info1)}
            helperText={
              errorInput.info1 ? 'Ange produktens info' : 'Produktens info 1'
            }
            value={value.info1}
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Info2"
            label="Info2"
            name="info2"
            error={Boolean(errorInput.info2)}
            value={value.info2}
            onChange={handleChange}
            helperText={
              errorInput.info2
                ? 'Ange produktens info'
                : 'Produktens korta info 2'
            }
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Info3"
            label="Info3"
            name="info3"
            onChange={handleChange}
            error={Boolean(errorInput.info3)}
            helperText={
              errorInput.info3
                ? 'Ange produktens info'
                : 'Produktens korta info 3'
            }
            value={value.info3}
          />
          <TextField
            required
            multiline
            maxRows={6}
            id="outlined-Quantity"
            label="Antal"
            name="quantity"
            onChange={handleChange}
            error={Boolean(errorInput.quantity)}
            helperText={
              errorInput.quantity
                ? 'Ange antal i lager'
                : 'Produktens antal i lager'
            }
            value={value.quantity}
          />
          {value.specifications?.map((_, index) => (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <TextField
                multiline
                maxRows={6}
                id="outlined-title"
                label="Spec title"
                name={`title`}
                onChange={(e) => handleSpecChange(index, e)}
                helperText={'Specifikationstitel ' + (index + 1)}
                value={value.specifications[index].title}
              />
              <TextField
                sx={{ marginLeft: 3 }}
                multiline
                maxRows={6}
                id="outlined-specinfo"
                label="Spec info"
                name={`value`}
                onChange={(e) => handleSpecChange(index, e)}
                helperText={'Ange specifikationsinfo ' + (index + 1)}
                value={value.specifications[index].value}
              />
            </div>
          ))}

          <p>Varumärke</p>
          <div style={{ marginBottom: '1rem' }}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleToggleButton}
            >
              <ToggleButton
                onClick={() => toggleCategory('sony')}
                style={{ marginLeft: '0.5rem' }}
                value="sony"
              >
                Sony
              </ToggleButton>
              <ToggleButton
                onClick={() => toggleCategory('panasonic')}
                style={{ marginLeft: '0.5rem' }}
                value="panasonic"
              >
                Panasonic
              </ToggleButton>
              <ToggleButton
                onClick={() => toggleCategory('fujifilm')}
                style={{ marginLeft: '0.5rem' }}
                value="fujifilm"
              >
                Fujifilm
              </ToggleButton>
              <ToggleButton
                onClick={() => toggleCategory('canon')}
                style={{ marginLeft: '0.5rem' }}
                value="canon"
              >
                Canon
              </ToggleButton>
              <ToggleButton
                onClick={() => toggleCategory('leica')}
                style={{ marginLeft: '0.5rem' }}
                value="leica"
              >
                Leica
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div>
          <Button
            style={{ marginBottom: '1rem' }}
            onClick={addSpecification}
            variant="outlined"
          >
            Lägg till specifikation
          </Button>
        </div>
        <Link to="/admin/products">
          <Button
            onClick={sendToAddProduct}
            variant="contained"
            disabled={Boolean(areAllFieldsFilled())}
            size="medium"
            color="primary"
          >
            Skapa produkt
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {props?.product ? 'Produkt uppdaterad' : 'Produkten tillagd'}
              </Typography>
            </Box>
          </Modal>
        </Link>
      </Box>
    </ThemeProvider>
  );
}
