import express from 'express';
import cors from 'cors';
import env from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './src/routes/userRoute.js';
import categoryRouter from './src/routes/categoryRoute.js';
import productRouter from './src/routes/productRouter.js';
import reviewRouter from './src/routes/reviewsRoute.js';
import cartsRouter from './src/routes/cartRouter.js';
import ordersRouter from './src/routes/orderRouter.js';
import cloudinary from 'cloudinary';

const app = express();
env.config();

const mongodbUrl = process.env.MONGODB_URL;
mongoose
  .connect(mongodbUrl)
  .then(() => console.log('DATABASE CONNECTED'))
  .catch((err) => console.error('DATABASE CONNECTION ERROR:', err));

app.use(express.json());
app.use(cors());

app.use('/healthCheck', (req, res) => {
  res.send('ok');
});

app.use('/ecommerce', userRouter);
app.use('/ecommerce', categoryRouter);
app.use('/ecommerce', productRouter);
app.use('/ecommerce', reviewRouter);
app.use('/ecommerce', cartsRouter);
app.use('/ecommerce', ordersRouter);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running at Port ${port}`);
});
