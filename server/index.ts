import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 5500;
const app = express();

app.use(express.json());

// mongoDB connection-string
const MONGO_URI =
  'mongodb+srv://grupp1:12345@cluster1.z3nab.mongodb.net/?retryWrites=true&w=majority';

try {
  // Connect to the MongoDB cluster
  mongoose.connect(MONGO_URI, () => console.log(' Mongoose is connected'));
} catch (e) {
  console.log('could not connect');
}

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
