import { ZodError } from 'zod';
import { MongoModel } from '../models';

export interface ServiceError { error: ZodError }

export default abstract class MongoService<T> {
  constructor(protected model: MongoModel<T>) { }

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }

  abstract create(obj: T): Promise<T | null | ServiceError>;

  abstract update(id: string, obj: T): Promise<T | null | ServiceError>;
}