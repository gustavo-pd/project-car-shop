import MongoController from './MongoController';
import { ICar } from '../interfaces';
import CarService from '../services/CarService';

export default class Car extends MongoController<ICar> {
  constructor(service = new CarService()) {
    super(service);
  }
}