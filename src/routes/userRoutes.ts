import { Router } from 'express';
import UserController from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/profile', protect, UserController.getProfile);

export default router;
