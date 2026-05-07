import express from 'express';
import { login, register, getAllEmployees } from '../controllers/authController.js';

const router = express.Router();
router.get('/employees', getAllEmployees);
router.post('/login', login);
router.post('/register', register);
export default router;