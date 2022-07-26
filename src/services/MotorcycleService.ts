import 
{ Motorcycle, MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import MotorcycleModel from '../models/MotorcycleModel';

const message = 'Object not found';

const MotorcycleService = {
  async create(obj: Motorcycle) {
    MotorcycleSchema.parse(obj);
    return MotorcycleModel.create(obj);
  },

  getAll: async () => MotorcycleModel.find(),

  async getById(id: string) {
    const motorcycle = await MotorcycleModel.findById(id);
    if (!motorcycle) {
      throw new Error(message);
    }
    return motorcycle;
  },

  async delete(id: string) {
    const motorcycle = await MotorcycleModel.findById(id);
    if (!motorcycle) {
      throw new Error(message);
    }
    return MotorcycleModel.findByIdAndDelete(id);
  },

  async update(id: string, obj: Motorcycle) {
    const motorcycleDb = await MotorcycleModel.findById(id);
    if (!motorcycleDb) {
      throw new Error(message);
    }
    MotorcycleSchema.parse(obj);
    return MotorcycleModel.findByIdAndUpdate(id, obj, { new: true });
  },
};

export default MotorcycleService;