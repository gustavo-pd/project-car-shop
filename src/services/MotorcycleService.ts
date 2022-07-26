import 
{ Motorcycle, MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';

const message = 'Object not found';

const MotorcycleService = {
  getAll: async () => MotorcycleModel.find(),

  async getById(id: string) {
    const find = await MotorcycleModel.findById(id);
    if (!find) {
      throw new Error(message);
    }
    return find;
  },

  async create(obj: Motorcycle) {
    MotorcycleSchema.parse(obj);
    return MotorcycleModel.create(obj);
  },

  async update(id: string, obj: Motorcycle) {
    const find = await MotorcycleModel.findById(id);
    if (!find) {
      throw new Error(message);
    }
    MotorcycleSchema.parse(obj);
    return MotorcycleModel.findByIdAndUpdate(id, obj, { new: true });
  },

  async delete(id: string) {
    const find = await MotorcycleModel.findById(id);
    if (!find) {
      throw new Error(message);
    }
    return MotorcycleModel.findByIdAndDelete(id);
  },
};

export default MotorcycleService;