import AppDataSource from '../config/ormConfig';
import {Task} from '../entities/task';
import {Comment} from '../entities/comment';
import {User} from '../entities/user';
import { Attachment } from '../entities/attachment';

class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);
  private commentRepository = AppDataSource.getRepository(Comment);
  private userRepository = AppDataSource.getRepository(User);
  private attachmentRepository = AppDataSource.getRepository(Attachment);

  public async createTask(data: Partial<Task>): Promise<Task> {
    const newTask = this.taskRepository.create(data);
    return await this.taskRepository.save(newTask);
  }

  public async updateTask(id: number, data: Partial<Task>): Promise<Task | null> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;
    this.taskRepository.merge(task, data);
    return await this.taskRepository.save(task);
  }

  public async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  public async getTaskById(id: number): Promise<Task | null> {
    return await this.taskRepository.findOneBy({ id });
  }

  public async deleteTask(id: number): Promise<boolean> {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return false;
    await this.taskRepository.remove(task);
    return true;
  }

  public async addComment(taskId: number, content: string, userId: number): Promise<Comment | null> {
    const task = await this.taskRepository.findOneBy({id:taskId});
    if (!task) return null;
    const user = await this.userRepository.findOneBy({id:userId});
    const comment = new Comment();
    comment.content = content;
    comment.task = task;
    if (user)
    comment.user = user;

    return await this.commentRepository.save(comment);
  }

  public async addAttachment(taskId: number, filePath: string): Promise<Attachment|null> {

    const task = await this.taskRepository.findOneBy({id: taskId});
    if (!task) return null;
    const attachment = new Attachment();
    attachment.filePath = filePath;
    attachment.task = task;

    return await this.attachmentRepository.save(attachment);
  }
}

export default new TaskService();
