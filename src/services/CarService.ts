import 
{ Car, CarSchema } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

const message = 'Object not found';

const CarService = {
  getAll: async () => CarModel.find(),

  async getById(id: string) {
    const find = await CarModel.findById(id);
    if (!find) {
      throw new Error(message);
    }
    return find;
  },

  async create(obj: Car) {
    CarSchema.parse(obj);
    return CarModel.create(obj);
  },

  async update(id: string, obj: Car) {
    const find = await CarModel.findById(id);
    if (!find) {
      throw new Error(message);
    }
    CarSchema.parse(obj);
    return CarModel.findByIdAndUpdate(id, obj, { new: true });
  },

  async delete(id: string) {
    const find = await CarModel.findById(id);
    if (!find) {
      throw new Error(message);
    }
    return CarModel.findByIdAndDelete(id);
  },
};

export default CarService;