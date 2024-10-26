import { Request, Response } from 'express';
import UserService from '../services/userService';

class userController {
  public async getProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id; // Extract user ID from request
      const userProfile = await UserService.getUserProfile(userId); // Fetch user using UserService

      res.status(200).json(userProfile);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new userController();
