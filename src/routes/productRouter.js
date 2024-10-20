import express from 'express';
import  upload from '../middleware/multer.js';
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controller/productController.js';

const router = express.Router();

router.post('/products', upload.single('image'), createProduct);
router.get('/products', getAllProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.single('image'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;
