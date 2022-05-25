import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { userRouter } from './user/user-router';
import { productRouter } from './product/product-router';
import cookiesession from 'cookie-session';
import { shipmentRouter } from './shipment/shipment-router';

require('dotenv').config();

const PORT = 4000;
const app = express();

// global middlewares
app.use(express.json());

// creating secure cookie
app.use(
  cookiesession({
    secret: 'aVeryS3cr3tK3y',
    maxAge: 1000 * 600,
    httpOnly: false,
    secure: false,
  })
);

// routes
app.use('/api', userRouter);
app.use('/api', productRouter);
app.use('/api', shipmentRouter);

//Connect to mongoose
dotenv.config({ path: '/.env' });
mongoose
  .connect(`${process.env.DB_CONNECTION}`)
  .catch((error) => console.log(error));

app.get('/', (req, res) => {
  res.send('server');
});

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
