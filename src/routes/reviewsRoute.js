import express from 'express';
import {
  createReviews,
  deleteReviews,
  getReviews,
  updateReviews,
} from '../controller/reviewsController.js';

const router = express.Router();

router.post('/reviews', createReviews);
router.get('/reviews/:productId', getReviews);
router.put('/reviews/:id', updateReviews);
router.delete('/reviews/:id', deleteReviews);

export default router;
