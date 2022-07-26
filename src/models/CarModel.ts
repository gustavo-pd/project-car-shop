import { Schema, model as mngModel, Document } from 'mongoose';
import Model from './MongoModel';
import { ICar } from '../interfaces';

interface CarDocument extends ICar, Document { }

export const carSchema = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, { versionKey: false });

export default class CarModel extends Model<ICar> {
  constructor(model = mngModel('Cars', carSchema)) {
    super(model);
  }
}