import { Router } from 'express';
import CarController from '../controllers/CarController';

const router = Router();

const carRoute = '/cars';

router.post(carRoute, CarController.create);
router.get(carRoute, CarController.getAll);
router.get(`${carRoute}/:id`, CarController.getById);
router.delete(`${carRoute}/:id`, CarController.delete);
router.put(`${carRoute}/:id`, CarController.update);

export default router;