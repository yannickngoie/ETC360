import { Router } from 'express';
import { register, login } from '../controllers/authController';
import authMiddleware from '../middlewares/authMiddleware';

const authRoutes = Router();

// Public routes
authRoutes.post('/register', register);
authRoutes.post('/login', login);

// Example of a protected route
authRoutes.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `Hello, ${req.user?.username}! You have access.` });
});

export default authRoutes;
