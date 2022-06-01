import {
  Accordion,
  AccordionDetails,
  Box,
  Grid,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { Order } from '../interfaces/interfaces';

interface OrderAccordionProps {
  order: Order;
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

function OrderAccoridion(props: OrderAccordionProps) {
  const order = props.order;
  const price = order.products
    .map((product) => product.price * product.quantity)
    .reduce((current, previous) => current + previous);

  const priceVAT = price * 1.25;
  const priceTotal = priceVAT + order.payment.price + order.shipment.price;

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

  return (
    <Accordion
      sx={{ width: '50%', margin: 'auto', marginBottom: '0.5rem' }}
      disableGutters
    >
      <AccordionSummary sx={{ width: '100%' }}>
        <Stack
          direction="row"
          sx={{ width: '100%', flexShrink: '0', padding: '1ex 2ex' }}
          justifyContent="space-between"
        >
          <Box>
            <Typography>Ordernummer: {order._id}</Typography>
            <Typography>Användare: {order.user.email}</Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography>{orderDateStr}</Typography>
            <Typography>{priceTotal}:-</Typography>
          </Box>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: '2rem' }}>
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
                <Stack
                  direction="row"
                  sx={{ padding: '1ex 2ex' }}
                  justifyContent="space-between"
                >
                  <img
                    style={{ width: '5rem' }}
                    src={product.images[0]}
                    alt=""
                  />
                  <Typography>{product.quantity} st</Typography>
                  <Typography>{product.price}:-</Typography>
                </Stack>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ width: '60%' }}>
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
      </AccordionDetails>
    </Accordion>
  );
}

export default OrderAccoridion;
