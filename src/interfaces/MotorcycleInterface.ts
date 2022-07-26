import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

const MotorcycleSchema = VehicleSchema.extend({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().int().gt(0).lte(2500),
});

export type Motorcycle = z.infer<typeof MotorcycleSchema>;

export { MotorcycleSchema };