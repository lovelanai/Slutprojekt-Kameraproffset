import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { env } from 'process';
require('dotenv').config();

const PORT = 5500;
const app = express();

app.use(express.json());

//Connect to mongoose
dotenv.config({ path: '/.env' });
mongoose.connect(
  `${process.env.DB_CONNECTION}`,
  {
    dbName: 'kameraproffset',
  },
  () => console.log('Connected to mongoDB')
);

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
