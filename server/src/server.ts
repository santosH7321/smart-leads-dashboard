import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from './config/db';
connectDB();

import express from 'express';
import cookieParser from 'cookie-parser';
import { AuthRouter } from './routes/user.route';
import { LeadRouter } from './routes/lead.routes';
import cors from "cors"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/auth", AuthRouter);
app.use("/lead", LeadRouter);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});