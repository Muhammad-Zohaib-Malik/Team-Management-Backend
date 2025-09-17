import { Router } from 'express';
import {
  getCurrentUser,
  loginController,
  logoutController,
  registerController
} from '../controllers/auth.controller.js';
import { isAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/logout', isAuth, logoutController);
router.get('/', isAuth, getCurrentUser);

export default router;
