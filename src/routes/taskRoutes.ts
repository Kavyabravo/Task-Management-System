import { Router } from 'express';
import TaskController from '../controllers/taskController';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator';

const router = Router();

router.post('/tasks', validateCreateTask, TaskController.createTask);
router.put('/tasks/:id', validateUpdateTask, TaskController.updateTask);
router.get('/tasks', TaskController.getAllTasks);
router.get('/tasks/:id', TaskController.getTaskById);
router.delete('/tasks/:id', TaskController.deleteTask);

export default router;