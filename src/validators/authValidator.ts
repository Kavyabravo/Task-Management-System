import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules for user registration
export const validateRegister = [
  body('name').notEmpty().isString().withMessage('Name must be a string'),
  body('email').notEmpty().isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation rules for user login
export const validateLogin = [
  body('email').notEmpty().isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
