import express from 'express';
import {
  createOrder,
  deleteOrders,
  getAllOrders,
  getOrderByUserId,
  updateorders,
} from '../controller/orderController.js';

const route = express.Router();

route.post('/orders', createOrder);
route.get('/orders/user/:userId', getOrderByUserId);
route.get('/orders', getAllOrders);
route.delete('/orders/:id', deleteOrders);
route.put('/orders/:id', updateorders);

export default route
