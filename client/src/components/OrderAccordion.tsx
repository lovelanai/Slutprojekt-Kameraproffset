import {
  Accordion,
  AccordionDetails,
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Typography,
  Checkbox,
} from '@mui/material';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Order } from '../interfaces/interfaces';
import { ChangeEvent, useState } from 'react';
import { markOrderAsSent } from '../services/orderService';
// import { getAllOrders, updateOrder } from '../services/orderService';

interface OrderAccordionProps {
  order: Order;
  admin?: Boolean;
  updateOrder?: (order: Order) => void;
}

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    marginLeft: '3ex',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

function OrderAccordion(props: OrderAccordionProps) {
  const [sent, setIsSent] = useState(props.order.sent !== null);
  const order = props.order;
  const price = order.products
    .map((product) => product.price * product.quantity)
    .reduce((current, previous) => current + previous);

  // const priceVAT = price;
  const priceTotal = price + order.payment.price + order.shipment.price;

  const orderDate = new Date(order.orderDate);
  const orderDateStr =
    orderDate.getFullYear().toString() +
    '-' +
    (orderDate.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    orderDate.getDate().toString().padStart(2, '0') +
    ' ' +
    orderDate.getHours().toString().padStart(2, '0') +
    ':' +
    orderDate.getMinutes().toString().padStart(2, '0') +
    ':' +
    orderDate.getSeconds().toString().padStart(2, '0');

  let sentOrderDateStr = '';
  if (order.sent !== null) {
    const sentOrderDate = new Date(order.sent);
    sentOrderDateStr =
      sentOrderDate.getFullYear().toString() +
      '-' +
      (sentOrderDate.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      sentOrderDate.getDate().toString().padStart(2, '0') +
      ' ' +
      sentOrderDate.getHours().toString().padStart(2, '0') +
      ':' +
      sentOrderDate.getMinutes().toString().padStart(2, '0') +
      ':' +
      sentOrderDate.getSeconds().toString().padStart(2, '0');
  }

  async function handleClick(order: Order, sent: Boolean) {
    markOrderAsSent(order, sent)
      .then((result) => result.json())
      .then((order) => {
        if (props.updateOrder) props.updateOrder(order);
      });

    // etProduct(id).then((p) => setProduct(p));
  }

  return (
    <Accordion
      sx={{ width: '80%', margin: 'auto', marginBottom: '0.5rem' }}
      disableGutters
    >
      <AccordionSummary sx={{ width: '100%' }}>
        <Stack
          direction="row"
          sx={{ width: '100%', flexShrink: '0', padding: '1ex 2ex' }}
          justifyContent="space-between"
        >
          <div className="order-user-info">
            <Box>
              <Typography>Ordernummer: {order._id}</Typography>
              <Typography>Användare: {order.user.email}</Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography>{orderDateStr}</Typography>
              <Typography>{priceTotal}:-</Typography>
            </Box>
          </div>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '2rem' }}>
        <div className="order-details">
          <h3>Personuppgifter</h3>
          <Grid
            display="grid"
            gridTemplateColumns="min-content auto"
            gap="0 1rem"
          >
            <Box>Telefon:</Box>
            <Box>{order.phoneNumber}</Box>
            <Box>Email:</Box>
            <Box>{order.email}</Box>
            <Box>Förnamn:</Box>
            <Box>{order.deliveryAddress.firstname}</Box>
            <Box>Efternamn:</Box>
            <Box>{order.deliveryAddress.lastname}</Box>
            <Box>Postnummer:</Box>
            <Box>{order.deliveryAddress.zipcode}</Box>
            <Box>Adress:</Box>
            <Box>{order.deliveryAddress.street}</Box>
          </Grid>

          <hr />

          <h3>Leveranssätt</h3>
          <p>
            {order.shipment.title}
            <br />
            {order.shipment.info}
            <br />
            Fraktkostnad: {order.shipment.price}:-
          </p>

          <hr />

          <h3>Betalning</h3>
          <p>
            {order.payment.title}
            <br />
            Avgift: {order.payment.price}:-
          </p>

          <hr />

          <h3>Produkter</h3>
          {order.products?.map((product, index) => (
            <Accordion key={index} disableGutters>
              <AccordionSummary sx={{ width: '100%' }}>
                <Box sx={{ width: '100%' }}>
                  <h4>{product.title}</h4>
                  <div className="order-accordion-product-container">
                    <Stack
                      direction="row"
                      sx={{ padding: '1ex 2ex' }}
                      justifyContent="space-between"
                    >
                      <img
                        style={{ width: '5rem' }}
                        src={`/api/media/${product.images[0]}`}
                        alt=""
                      />
                      <div className="order-accordion-product">
                        <Typography>{product.quantity} st</Typography>
                        <Typography>{product.price}:-</Typography>
                      </div>
                    </Stack>
                  </div>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ width: '100%' }}>
                  <p>{product.longinfo}</p>
                  {product.info.map((info, index) => (
                    <p key={index}>{info}</p>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
          <hr />
          <Typography>Totalpris: {priceTotal}:-</Typography>
          <Box>
            {props.admin ? (
              <>
                <Typography>Status: </Typography>
                <Checkbox
                  checked={sent}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setIsSent(e.target.checked)
                  }
                />
                <Button onClick={() => handleClick(order, sent)}>
                  Skickad
                </Button>
              </>
            ) : null}
            <Typography component="p">
              {order.sent !== null
                ? 'Order skickad ' + sentOrderDateStr
                : 'Order inte skickad'}
            </Typography>
          </Box>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderAccordion;
