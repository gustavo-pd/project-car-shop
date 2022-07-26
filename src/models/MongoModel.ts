import { Model, Document } from 'mongoose';
import { IModel } from '../interfaces';

abstract class MongoModel<T> implements IModel<T> {
  constructor(protected model: Model<T & Document>) { }

  async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  async read(): Promise<T[]> {
    return this.model.find();
  }

  async readOne(id: string): Promise<T | null> {
    return this.model.findOne({ id });
  }

  async update(id: string, obj: T): Promise<T | null> {
    return this.model
      .findOneAndUpdate({ id }, { ...obj }, { returnOriginal: false });
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findOneAndDelete({ id });
  }
}

export default MongoModel;