import { Request, Response } from 'express';
import AuthService from '../services/authService';

class AuthController {
  public async register(req: Request, res: Response): Promise<void> {
    try {
      const newUser = await AuthService.register(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const token = await AuthService.login(req.body);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}

export default new AuthController();
