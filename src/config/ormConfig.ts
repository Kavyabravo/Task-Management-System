import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/user';
import { Task } from '../entities/task';
import { Team } from '../entities/team';
import { Attachment } from '../entities/attachment';
import { Comment } from '../entities/comment';

dotenv.config();
const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Task, Team, Attachment, Comment],
});

export default AppDataSource;
