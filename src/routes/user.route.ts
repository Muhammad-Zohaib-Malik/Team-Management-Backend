import { Router } from 'express';
import { getCurrentUser } from '../controllers/user.controller.js';

const router = Router();
router.get('/', getCurrentUser);

export default router;
