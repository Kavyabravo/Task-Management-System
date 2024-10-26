import AppDataSource from '../config/ormConfig';
import {Task} from '../entities/task';

class TaskService {
  private taskRepository = AppDataSource.getRepository(Task);

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
}

export default new TaskService();
