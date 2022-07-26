import { ICar } from '../interfaces';
import MongoService, { ServiceError } from './MongoService';
import { CarModel } from '../models';
import { CarSchema } from '../interfaces/CarInterface';

export default class CarService extends MongoService<ICar> {
  constructor(protected model = new CarModel()) {
    super(model);
  }

  create = async (car: ICar)
  : Promise<ICar | ServiceError | null> => {
    const parsed = CarSchema.safeParse(car);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(car);
  };

  update = async (id: string, car: ICar): 
  Promise<ICar | ServiceError | null> => {
    const parsed = CarSchema.safeParse(car);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, car);
  };
}