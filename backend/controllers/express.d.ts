import { DecodedToken } from '../middlewares/authMiddleware'

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken; // Add the `user` property
    }
  }
}
