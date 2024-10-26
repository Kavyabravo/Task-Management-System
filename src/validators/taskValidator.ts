import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules for creating a new task
export const validateCreateTask = [
  body('title').isString().withMessage('Title must be a string'),
  body('description').isString().optional().withMessage('Description must be a string'),
  body('dueDate').isISO8601().withMessage('Due date must be a valid date'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

// Validation rules for updating a task
export const validateUpdateTask = [
  param('id').isNumeric().withMessage('Invalid task ID'),
  body('title').isString().optional().withMessage('Title must be a string'),
  body('description').isString().optional().withMessage('Description must be a string'),
  body('dueDate').isISO8601().optional().withMessage('Due date must be a valid date'),
  body('status').isBoolean().optional().withMessage('Status must be a boolean'),

  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
