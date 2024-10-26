import { Request, Response } from 'express';
import TaskService from '../services/taskService';

class TaskController {
  public async createTask(req: Request, res: Response): Promise<void> {
    try {
      const newTask = await TaskService.createTask(req.body);
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async updateTask(req: Request, res: Response): Promise<void> {
    const updatedTask = await TaskService.updateTask(+req.params.id, req.body);
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTask);
  }

  public async getAllTasks(req: Request, res: Response): Promise<void> {
    const tasks = await TaskService.getAllTasks();
    res.status(200).json(tasks);
  }

  public async getTaskById(req: Request, res: Response): Promise<void> {
    const task = await TaskService.getTaskById(+req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  }

  public async deleteTask(req: Request, res: Response): Promise<void> {
    const success = await TaskService.deleteTask(+req.params.id);
    if (!success) {
      res.status(404).json({ message: 'Task not found' });
    }
    res.status(204).send();
  }

  public async addComment(req: Request, res: Response): Promise<void> {
    const { content } = req.body;
    const taskId = +req.params.id
    try {
      const comment = await TaskService.addComment(taskId, content, (req as any).user.id);
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  public async addAttachment(req: Request, res: Response): Promise<void> {
    const taskId = +req.params.id
    const filePath = "file path";

    try {
      const attachment = await TaskService.addAttachment(taskId, filePath);
      res.status(201).json(attachment);
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new TaskController();
