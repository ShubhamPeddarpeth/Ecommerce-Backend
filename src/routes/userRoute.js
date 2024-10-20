import express from 'express';
import {
  getUserProfile,
  signInController,
  signupController,
} from '../controller/userController.js';

const router = express.Router();

router.post('/register', signupController);
router.post('/signin', signInController);
router.get('/user/profile', getUserProfile);

export default router;
