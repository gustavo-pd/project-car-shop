import CustomRouter from './routes/Router';
import App from './app';
import { ICar } from './interfaces';
import CarController from './controllers/CarController';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<ICar>();
carRouter.addRoute(carController, '/cars');

server.addRouter(carRouter.router);

export default server;