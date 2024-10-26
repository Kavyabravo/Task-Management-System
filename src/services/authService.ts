import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AppDataSource from '../config/ormConfig';
import { User } from '../entities/user';

class AuthService {
    private userRepository = AppDataSource.getRepository(User);

  // Register a new user
  public async register(userData: { name: string; email: string; password: string }) {
    const { name, email, password } = userData;

    // Check if the user already exists
    const existingUser = await this.userRepository.findOne({ where: { email } });
    console.log(existingUser)
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user and save to the database
    const newUser = this.userRepository.create({ name, email, password: hashedPassword });
    await this.userRepository.save(newUser);

    // Return the created user without the password field
    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Authenticate user and return JWT token
  public async login(userData: { email: string; password: string }) {
    const { email, password } = userData;

    // Find user by email
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    });

    return { token, userId: user.id };
  }
}

export default new AuthService();
