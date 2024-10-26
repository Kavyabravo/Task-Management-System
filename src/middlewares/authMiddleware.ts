import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/user';

// Extend the Express Request interface locally within the file
interface AuthenticatedRequest extends Request {
  user?: User;
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
      const user = await User.findOne({ where: { id: decoded.id } });

      if (!user) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      // Attach user to request
      req.user = user;

      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
