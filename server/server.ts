import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { userRouter } from './user/user-router';

require('dotenv').config();

const PORT = 4000;
const app = express();

// global middlewares
app.use(express.json());

// routes
app.use('/api', userRouter);

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
