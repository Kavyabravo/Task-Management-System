import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, ManyToMany, OneToMany } from "typeorm";
import bcrypt from "bcryptjs";
import { Team } from './team';
import { Task } from './task';
import { Comment } from './comment';

@Entity({ name: 'User', schema: 'task-management' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @ManyToMany(() => Team, (team) => team.members)
  teams!: Team[];

  @ManyToMany(() => Task, (task) => task.assignees)
  tasks!: Task[];

  @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
  comments!: Comment[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
