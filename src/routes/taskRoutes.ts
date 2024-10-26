import { Router } from 'express';
import TaskController from '../controllers/taskController';
import { validateCreateTask, validateUpdateTask } from '../validators/taskValidator';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', protect, validateCreateTask, TaskController.createTask);
router.put('/:id', protect, validateUpdateTask, TaskController.updateTask);
router.get('/', protect, TaskController.getAllTasks);
router.get('/:id', protect, TaskController.getTaskById);
router.delete('/:id', protect,  TaskController.deleteTask);
router.get('/:id', protect, TaskController.getTaskById);
router.delete('/:id', protect,TaskController.deleteTask);
router.post('/:id/comment', protect, TaskController.addComment);
router.post('/:id/attachment', protect,TaskController.addAttachment);

export default router;