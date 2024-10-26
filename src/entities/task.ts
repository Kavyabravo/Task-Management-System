import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { User } from "./user";

@Entity({ name: 'Task', schema: 'task-management' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ type: "timestamp", nullable: true })
  dueDate!: Date;

  @Column({ default: 'open' })
  status!: 'open' | 'completed';

  @ManyToOne(() => User, user => user.id)
  assignedTo!: User;

  @ManyToOne(() => User, user => user.id)
  createdBy!: User;
}
