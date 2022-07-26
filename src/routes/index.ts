import { Router } from 'express';
import MotorcycleController from '../controllers/MotorcycleController';

const routes = Router();

const motorcycleRoute = '/motorcycles';

routes.post(motorcycleRoute, MotorcycleController.create);
routes.get(motorcycleRoute, MotorcycleController.getAll);
routes.get(`${motorcycleRoute}/:id`, MotorcycleController.getById);
routes.delete(`${motorcycleRoute}/:id`, MotorcycleController.delete);
routes.put(`${motorcycleRoute}/:id`, MotorcycleController.update);

export default routes;