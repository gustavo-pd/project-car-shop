import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';

const router = Router();

const motorcycleRoute = '/motorcycles';

router.post(motorcycleRoute, MotorcycleController.create);
router.get(motorcycleRoute, MotorcycleController.getAll);
router.get(`${motorcycleRoute}/:id`, MotorcycleController.getById);
router.delete(`${motorcycleRoute}/:id`, MotorcycleController.delete);
router.put(`${motorcycleRoute}/:id`, MotorcycleController.update);

export default router;