import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  createTheme,
  ToggleButtonGroup,
  ToggleButton,
  Input,
  Paper,
  Stack,
} from '@mui/material';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import { Product } from '../interfaces/interfaces';
import { createMedia, replaceMedia } from '../services/mediaService';
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

class ImageDataWithInfo {
  file: File | undefined;
  value: string = '';
  info: string = '';

  constructor(value: string, info: string, file?: File) {
    this.file = file;
    this.value = value;
    this.info = info;
  }
}

const brands = ['sony', 'panasonic', 'fujifilm', 'canon', 'leica'];
const cameraTypes = ['systemkamera', 'kompaktkamera', 'mellanformatskamera'];

export default function AdminPageForm(props: Props) {
  const navigate = useNavigate();

  const initialValues = {
    _id: props?.product?._id || '',
    title: props?.product?.title || '',
    longinfo: props?.product?.longinfo || '',
    info: props?.product?.info || [],
    price: props?.product?.price || '',
    quantity: props?.product?.quantity || 0,
    images: props?.product?.images || [],
    category: props?.product?.category || { brand: '', type: '' },

    specifications: props?.product?.specifications || [],
  };

  const imagesWithInfoInitialState = initialValues.images.map(
    (image, index) => new ImageDataWithInfo(image, initialValues.info[index])
  );

  if (imagesWithInfoInitialState.length === 0) {
    imagesWithInfoInitialState.push(new ImageDataWithInfo('', ''));
  }

  const [imagesWithInfo, setImagesWithInfo] = useState<ImageDataWithInfo[]>(
    imagesWithInfoInitialState
  );

  const addImageWithInfo = () => {
    setImagesWithInfo([...imagesWithInfo, new ImageDataWithInfo('', '')]);
  };

  const removeImageWithInfo = (index: number) => {
    const newImagesWithInfo = [...imagesWithInfo];
    newImagesWithInfo.splice(index, 1);
    setImagesWithInfo(newImagesWithInfo);
  };

  const initialErrors = {
    title: false,
    longinfo: false,
    quantity: false,
    price: false,
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
  const handleClose = () => {
    setOpen(false);
    navigate('/admin/products');
  };

  useEffect(() => {
    setValue(initialValues);
  }, [props.product]);

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

  const handleAddProduct = async (): Promise<any> => {
    let imageUploadPromises = imagesWithInfo
      .map((image, index) => {
        if (image.file === undefined) {
          return new Promise((resolve) => resolve({ _id: image.value }));
        }

        const formData = new FormData();
        formData.append('media', image.file!);

        if (
          props?.product?.images[index] &&
          props?.product?.images[index].startsWith('http') !== true
        ) {
          return replaceMedia(props.product.images[index], formData);
        } else {
          return createMedia(formData);
        }
      })
      .filter((image) => image !== null);

    const images = (await Promise.all(imageUploadPromises)).map(
      (image) => image._id
    );

    const product: Product = {
      _id: props?.product?._id ?? undefined,
      title: value.title!,
      longinfo: value.longinfo!,
      info: imagesWithInfo.map((image) => image.info),
      price: Number(value.price),
      quantity: Number(value.quantity),
      images,
      category: value.category!,
      specifications: value.specifications!,
    };

    if (props?.product) {
      return await updateProduct(product);
    } else {
      return await addProduct(product);
    }
  };

  const sendToAddProduct = () => {
    handleAddProduct()
      .then((response) => addedProductMessage())
      .catch((error) => console.log(error));
  };

  const areAllFieldsFilled = () => {
    if (
      value.title?.length &&
      value.price?.toString().length &&
      value.longinfo?.length &&
      value.quantity?.toString().length
    ) {
      return false;
    } else return true;
  };

  const handleToggleButton = (_: any, brand: string) =>
    setValue({ ...value, category: { ...value.category, brand } });

  const handleTypeToggleButton = (_: any, type: string) =>
    setValue({ ...value, category: { ...value.category, type } });

  const handleImageChange = (
    imageIndex: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImagesWithInfo = [...imagesWithInfo];
      newImagesWithInfo[imageIndex].file = event.target.files[0];
      setImagesWithInfo(newImagesWithInfo);
    }
  };

  const handleInfoChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    imagesWithInfo[index].info = event.target.value;
    setImagesWithInfo(imagesWithInfo);
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
        <div style={{ paddingBottom: '3rem', paddingTop: '1rem' }}>
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

            {imagesWithInfo.map((image, index) => (
              <Paper
                key={index}
                variant="outlined"
                sx={{ padding: '1rem', marginBottom: '1rem' }}
              >
                <Stack direction="row">
                  <Box>
                    <img
                      src={
                        image.file
                          ? URL.createObjectURL(image.file)
                          : image.value
                          ? image.value.startsWith('http') === true
                            ? image.value
                            : `/api/media/${image.value}`
                          : undefined
                      }
                      alt=""
                      width="110"
                      style={{ marginRight: '1rem' }}
                    />
                  </Box>
                  <Box sx={{ minWidth: '70%', maxWidth: '1000px' }}>
                    <Input
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleImageChange(index, e)
                      }
                      name="image"
                      type="file"
                      inputProps={{ accept: 'image/*' }}
                    />
                    <TextField
                      required
                      multiline
                      maxRows={6}
                      id="outlined-Info1"
                      label="Info"
                      name="info"
                      onChange={(
                        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                      ) => handleInfoChange(index, e)}
                      defaultValue={image.info}
                      /* error={Boolean(errorInput.info1)}

                helperText={
                  errorInput.info1
                    ? 'Ange produktens info'
                    : 'Produktens info 1'
                }
                value={value.info1}
                */
                    />
                  </Box>
                  <Stack
                    flexGrow="1"
                    justifyContent="center"
                    alignItems="flex-end"
                  >
                    <div className="product-image-buttons">
                      <Button onClick={addImageWithInfo}>
                        <AddCircleOutlineRoundedIcon
                          sx={{ height: '2em', width: '2em' }}
                        />
                      </Button>
                      <Button onClick={() => removeImageWithInfo(index)}>
                        <RemoveCircleOutlineRoundedIcon
                          sx={{ height: '2em', width: '2em' }}
                        />
                      </Button>
                    </div>
                  </Stack>
                </Stack>
              </Paper>
            ))}

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
              <div key={index} className="admin-form-inputs">
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

            <div>
              <Button
                style={{ marginBottom: '1rem' }}
                onClick={addSpecification}
                variant="outlined"
              >
                Lägg till specifikation
              </Button>
            </div>
            <p>Varumärke</p>
            <div style={{ marginBottom: '1rem' }}>
              <ToggleButtonGroup
                color="primary"
                value={value.category.brand}
                exclusive
                onChange={handleToggleButton}
                className="camera-type-buttons"
              >
                {brands.map((brand, index) => (
                  <ToggleButton
                    key={index}
                    style={{ marginLeft: '0.5rem' }}
                    value={brand}
                  >
                    {brand}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>

            <p>Kameratyp</p>
            <div style={{ marginBottom: '1rem' }}>
              <ToggleButtonGroup
                color="primary"
                value={value.category.type}
                exclusive
                onChange={handleTypeToggleButton}
                className="camera-type-buttons"
              >
                {cameraTypes.map((type, index) => (
                  <ToggleButton
                    key={index}
                    style={{ marginLeft: '0.5rem' }}
                    value={type}
                  >
                    {type}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </div>
          </div>

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
        </div>
      </Box>
    </ThemeProvider>
  );
}
