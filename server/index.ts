import express from 'express';
import mongoose from 'mongoose';

const PORT = 5500;
const app = express();

app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/', (err) => {});

//Server is running
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
