import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface DecodedToken {
  id: string;
  username: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'JWT_SECRET is not set in the environment' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken;
    req.user = decoded; // Attach decoded user info to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
