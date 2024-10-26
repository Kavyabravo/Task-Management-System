import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { User } from "./user";
import { Attachment } from "./attachment";
import { Comment } from "./comment";

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

  @ManyToMany(() => User)
  @JoinTable()
  assignees!: User[];

  @OneToMany(() => Comment, (comment) => comment.task, { cascade: true })
  comments!: Comment[];

  @OneToMany(() => Attachment, (attachment) => attachment.task, { cascade: true })
  attachments!: Attachment[];

  @ManyToOne(() => User, user => user.id)
  createdBy!: User;
}
