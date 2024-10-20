import express from 'express';
import {
  createCategory,
  getAllCategory,
  updatecategory,
  deleteCategory,
} from '../controller/categoryController.js';

const router = express.Router();

router.post('/category', createCategory);
router.get('/category', getAllCategory);
router.put('/category/:id', updatecategory);
router.delete('/category/:id', deleteCategory);

export default router;
