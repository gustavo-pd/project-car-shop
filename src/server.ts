import App from './app';
import routerMotorcycle from './routes/Motorcycles';
import routerCar from './routes/Cars';

const server = new App();
server.addRouter(routerMotorcycle);
server.addRouter(routerCar);
export default server;
