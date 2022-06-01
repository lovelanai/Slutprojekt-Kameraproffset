/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Card,
  CardActions,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import { ShoppingCartContext } from '../contexts/ShoppingCartContext';
import { useConfirmation } from '../contexts/ConfirmContext';
import {
  CreateOrderBody,
  Delivery,
  Payment,
  PaySelection,
  PersonalData,
  ShipperSelection,
} from '../interfaces/interfaces';
import CardPayment from './CardPayment';
import FakturaPayment from './FakturaPayment';
import SwishPayment from './SwishPayment';
import Shipping from './Shipping';
import {
  getAllPaymentMethods,
  getAllShipmentMethods,
} from '../services/productService';
import './css/CheckOutAccordion.css';
import { createOrder } from '../services/orderService';
import { useError } from '../contexts/ErrorContext';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CheckOutAccordion() {
  const navigate = useNavigate();
  const { confirm } = useConfirmation();
  const { cartItems } = React.useContext(ShoppingCartContext);
  const error = useError();
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const [shipment, setShipment] = useState<Delivery[]>([]);
  const [payment, setPayment] = useState<Payment[]>([]);
  const [createOrderBody, setCreateOrderBody] = useState<CreateOrderBody>({
    email: '',
    phoneNumber: '',
    products: cartItems.map((p) => {
      return {
        id: p._id!,
        quantity: p.quantity,
      };
    }),
    deliveryAddress: {
      street: '',
      zipcode: '',
      firstname: '',
      lastname: '',
    },
    payment: '',
    shipment: '',
  });

  const defaultShipperState: ShipperSelection[] = shipment.map((shipper) => ({
    shipper,
    checked: false,
  }));

  useEffect(() => {
    console.log(createOrderBody);
  }, [createOrderBody]);

  useEffect(() => {
    getAllShipmentMethods().then((s) => {
      setShipment(s);
    });

    getAllPaymentMethods().then((p) => {
      setPayment(p);
    });
  }, [setShipment, setPayment]);

  useEffect(() => {
    const shipmentOptions = shipment.map((shipper) => ({
      shipper,
      checked: false,
    }));
    const paymentOptions = payment.map((paymethod) => ({
      paymethod,
      paychecked: false,
    }));

    setCheckboxes(shipmentOptions);
    setCheckboxesPay(paymentOptions);
  }, [shipment, payment]);

  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [checkboxes, setCheckboxes] =
    React.useState<ShipperSelection[]>(defaultShipperState);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const defaultPaymentState: PaySelection[] = payment.map((paymethod) => ({
    paymethod,
    paychecked: false,
  }));

  const [checkboxesPay, setCheckboxesPay] =
    React.useState<PaySelection[]>(defaultPaymentState);

  const [personalInfo, setPersonalInfo] = useState<PersonalData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    postnr: '',
    street: '',
  });

  function sendPersonalData(personaldata: PersonalData) {
    setPersonalInfo(personaldata);
    setCreateOrderBody({
      ...createOrderBody,
      email: personaldata.email,
      phoneNumber: personaldata.phone,
      deliveryAddress: {
        street: personaldata.street,
        zipcode: personaldata.postnr,
        firstname: personaldata.firstName,
        lastname: personaldata.lastName,
      },
    });
  }

  function setPaymentMethod() {
    const paymentId = checkboxesPay.find((item) => item.paychecked === true)
      ?.paymethod._id!;
    setCreateOrderBody({ ...createOrderBody, payment: paymentId });
    setExpanded('panel3');
  }

  function setShippingMethod() {
    const shipmentId = checkboxes.find((item) => item.checked === true)?.shipper
      ._id!;
    setCreateOrderBody({ ...createOrderBody, shipment: shipmentId });
    setExpanded('panel5');
  }

  const areAllFieldsFilled = () => {
    if (
      personalInfo.email?.length >= 5 &&
      personalInfo.firstName?.length &&
      personalInfo.lastName?.length &&
      personalInfo.phone.toString().length >= 7 &&
      personalInfo.postnr?.toString().length === 5 &&
      personalInfo.street?.length
    ) {
      return false;
    } else return true;
  };

  const submitOrder = () => {
    createOrder(createOrderBody)
      .then((response) => {
        if (response.ok) {
          confirm(createOrderBody);
          navigate(`/confirmation/${personalInfo.email}`);
        } else {
          return response.json();
        }
      })
      .then((err) => {
        error?.setErrorTitle('Kunde inte skapa beställning');
        error?.setErrorMessage(err.error);
        error?.handleOpen();
      })
      .catch((error) => console.log('dasdas'));
  };

  return (
    <div className="checkoutPageContainer">
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={{ width: '100%' }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Personuppgifter</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Shipping sendPersonalData={sendPersonalData} />
          <Button
            variant="contained"
            disabled={Boolean(areAllFieldsFilled())}
            onClick={() => setExpanded('panel2')}
            size="medium"
            sx={{ width: '100%' }}
          >
            Bekräfta
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{ width: '100%' }}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Betalningsalternativ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'} className="DeliveryForm">
            {checkboxesPay.map((CheckBox, index) => (
              <div key={index}>
                <FormGroup
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '1rem 0',
                  }}
                >
                  <Checkbox
                    onChange={() => {
                      let checkboxPayListToUpdate = checkboxesPay;

                      checkboxPayListToUpdate.forEach((tempCheckbox) => {
                        tempCheckbox.paychecked = false;
                      });

                      const currentBoxIndex = payment.findIndex(
                        (item) => item._id === CheckBox.paymethod._id
                      );

                      checkboxPayListToUpdate[currentBoxIndex].paychecked =
                        true;

                      setCheckboxesPay([...checkboxPayListToUpdate]);
                    }}
                    checked={CheckBox.paychecked}
                  />

                  <div className="info">
                    <div>
                      <p>{CheckBox.paymethod.info}</p>
                      <p>{CheckBox.paymethod.alt}</p>
                      <p>Avgift{' ' + CheckBox.paymethod.price}:-</p>
                    </div>
                  </div>
                </FormGroup>
              </div>
            ))}
          </Typography>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            disabled={
              checkboxesPay.find((item) => item.paychecked === true)
                ? false
                : true
            }
            onClick={setPaymentMethod}
          >
            Bekräfta
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={{ width: '100%' }}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Betalning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            {checkboxesPay.find((item) => item.paychecked === true)?.paymethod
              .title === 'Kortbetalning' ? (
              <CardPayment triggerNextAccordion={() => setExpanded('panel4')} />
            ) : checkboxesPay.find((item) => item.paychecked === true)
                ?.paymethod.title === 'Swish' ? (
              <SwishPayment
                telnumber={personalInfo.phone}
                triggerNextAccordion={() => setExpanded('panel4')}
              />
            ) : checkboxesPay.find((item) => item.paychecked === true)
                ?.paymethod.title === 'Faktura' ? (
              <FakturaPayment
                email={personalInfo.email}
                triggerNextAccordion={() => setExpanded('panel4')}
              />
            ) : (
              <p>Ingen betalningsmetod vald</p>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/*Fraktuppgifter liggandes i andra accordion*/}
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={{ width: '100%' }}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Leveransalternativ</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'} className="DeliveryForm">
            {checkboxes.map((checkbox, index) => (
              <div key={index}>
                <FormGroup
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '1rem 0',
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() => {
                          let checkboxListToUpdate = checkboxes;

                          checkboxListToUpdate.forEach((tempCheckbox) => {
                            tempCheckbox.checked = false;
                          });

                          const currentBoxIndex = shipment.findIndex(
                            (item) => item._id === checkbox.shipper._id
                          );

                          checkboxListToUpdate[currentBoxIndex].checked = true;

                          setCheckboxes([...checkboxListToUpdate]);
                        }}
                        checked={checkbox.checked}
                      />
                    }
                    label={
                      <img
                        className="shipper-img"
                        src={checkbox.shipper.image}
                        alt=""
                      />
                    }
                  />

                  <div className="info">
                    <p>{checkbox.shipper.price}:-</p>
                    <p>{checkbox.shipper.info}</p>
                  </div>
                </FormGroup>
              </div>
            ))}
          </Typography>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            disabled={
              checkboxes.find((item) => item.checked === true) ? false : true
            }
            onClick={setShippingMethod}
          >
            Bekräfta
          </Button>
        </AccordionDetails>
      </Accordion>

      <Accordion
        onChange={handleChange('panel5')}
        expanded={expanded === 'panel5'}
        sx={{ width: '100%' }}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Översikt</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={'div'}>
            <div className="person">
              <h3>Personuppgifter</h3>
              <p>Telefon: {personalInfo.phone}</p>
              <p>Email: {personalInfo.email}</p>
              <p>Förnamn: {personalInfo.firstName}</p>
              <p>Efternamn: {personalInfo.lastName}</p>
              <p>Postnr: {personalInfo.postnr}</p>
              <p>Adress: {personalInfo.street}</p>
              <div>
                <hr />
                <h3>Leveranssätt</h3>
                {/* {checkboxes.map((checked) => (<div>{checked.findIndex() === true}</div>))} */}
                <p>
                  {
                    checkboxes.find((item) => item.checked === true)?.shipper
                      .title
                  }{' '}
                </p>
                <p>
                  {
                    checkboxes.find((item) => item.checked === true)?.shipper
                      .info
                  }
                </p>{' '}
                <p>
                  Fraktkostnad:
                  {' ' +
                    checkboxes.find((item) => item.checked === true)?.shipper
                      .price}
                  :-
                </p>{' '}
                <hr />
                <h3>Betalning</h3>
                <p>
                  {
                    checkboxesPay.find((item) => item.paychecked === true)
                      ?.paymethod.title
                  }{' '}
                </p>
                <p>
                  Avgift
                  {' ' +
                    checkboxesPay.find((item) => item.paychecked === true)
                      ?.paymethod.price}
                  :-{' '}
                </p>{' '}
              </div>
              <hr />
              <div>
                <h3>Valda produkter</h3>

                {cartItems.map((item, index) => (
                  <div className="product-checkout-container" key={index}>
                    <Card className="product-checkout-width">
                      <h1>{item.title}</h1>
                      <div className="image-checkout-container">
                        <img src={`/api/media/${item.images[0]}`} alt="" />

                        <CardActions>
                          <Typography>{item.quantity} st</Typography>
                        </CardActions>
                        <Typography>{item.quantity * item.price}:- </Typography>
                      </div>
                    </Card>
                  </div>
                ))}
              </div>
              <hr />
              Totalpris:{' '}
              {totalCost +
                checkboxesPay.find((item) => item.paychecked === true)
                  ?.paymethod.price! +
                checkboxes.find((item) => item.checked === true)?.shipper
                  .price!}{' '}
              kr
              <div>Moms: {totalCost * 0.25} kr</div>
            </div>
            <br />
            {/* If shipping and payment has not been choosen, the button is disabled. If they have been choosen
            the button will not be disabled and the "Link-to" will work. */}
            {checkboxes.find((item) => item.checked === true) &&
            checkboxesPay.find((item) => item.paychecked === true) ? (
              <Button
                onClick={submitOrder}
                variant="contained"
                sx={{ width: '100%' }}
              >
                Slutför köp
              </Button>
            ) : (
              <Button
                disabled={true}
                variant="contained"
                sx={{ width: '100%' }}
              >
                Slutför köp
              </Button>
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
