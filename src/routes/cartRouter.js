import express from 'express';
import {
  addToCart,
  deleteAllCartsById,
  deleteCartById,
  getCartByUserId,
  updateCartById
} from '../controller/cartController.js';

const router = express.Router();

router.post('/carts', addToCart);
router.get('/carts/user/:userId', getCartByUserId);
router.put('/carts/:id',updateCartById);
router.delete('/carts/:id', deleteCartById);
router.delete('/carts/user/:userId', deleteAllCartsById);


export default router
