import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { CarSchema } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

const message = 'Id must have 24 hexadecimal characters';

const CarController = {
  async getAll(req: Request, res: Response) {
    try {
      const response = await CarService.getAll();
      res.status(200).json(response);
    } catch (error) {
      return res.status(500).json(
        { error: 'Internal server error' },
      );
    }
  },

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    if (id.length !== 24) {
      return res
        .status(400).json(
          { error: message },
        );
    }

    try {
      const response = await CarService.getById(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json(
        { error: (error as Error).message },
      );
    }
  },

  async create(req: Request, res: Response) {
    const info = req.body;

    try {
      const response = await CarService.create(info);
      res.status(201).json(response);
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json(
          { error: error.message },
        );
      } else {
        res.status(500).json(
          { error: 'Internal server error' },
        );
      }
    }
  },
  
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const info = req.body;

    if (id.length !== 24) {
      return res
        .status(400).json({ error: message });
    }
    
    try {
      CarSchema.parse(info);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }

    try {
      const response = await CarService
        .update(id, info);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error: (error as Error).message });
    }
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    if (id.length !== 24) {
      return res
        .status(400).json(
          { error: message },
        );
    }

    try {
      await CarService.delete(id);
      return res.status(204).json();
    } catch (error) {
      return res.status(404).json(
        { error: (error as Error).message },
      );
    }
  },
};

export default CarController;