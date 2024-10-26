// entities/Attachment.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
  } from 'typeorm';
  import { Task } from './task';
  
  @Entity()
  export class Attachment {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column()
    filePath!: string;
  
    @ManyToOne(() => Task, (task) => task.attachments)
    task!: Task;
  
    @CreateDateColumn()
    createdAt!: Date;
  }
  