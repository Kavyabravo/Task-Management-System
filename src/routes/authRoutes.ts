import { Router } from 'express';
import AuthController from '../controllers/authController';
import { validateRegister, validateLogin } from '../validators/authValidator';

const router = Router();

router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

export default router;
