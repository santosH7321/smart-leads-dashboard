import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
connectDB();

import express from 'express';

const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});