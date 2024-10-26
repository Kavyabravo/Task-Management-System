// services/userService.ts
import { User } from '../entities/user';

export class UserService {
  public async getUserProfile(userId: number) {
    try {
      const user = await User.findOne({ where: { id: userId } });
      if (!user) {
        throw new Error('User does not exists');
      }
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw new Error('Could not fetch user');
    }
  }
}

export default new UserService();