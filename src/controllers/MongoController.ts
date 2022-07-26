import { Request, Response } from 'express';
import MongoService from '../services/MongoService';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  idMustHave24Char = 'Id must have 24 hexadecimal characters',
  notFound = 'Object not found',
}

export default abstract class MongoController<T> {
  constructor(protected service: MongoService<T>) { }

  read = async (
    _req: Request,
    res: Response<T[] | []>,
  )
  :Promise<typeof res> => {
    const allElements = await this.service.read();
    return res.json(allElements);
  };

  readOne = async (
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  )
  :Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res
        .status(400)
        .json({ error: ControllerErrors.idMustHave24Char });
    }

    const oneElement = await this.service.readOne(id);

    if (!oneElement) {
      return res
        .status(404)
        .json({ error: ControllerErrors.notFound });
    }

    return res.json(oneElement);
  };

  create = async (
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  )
  :Promise<typeof res> => {
    const { body } = req;
    const elementCreated = await this.service.create({ ...body });

    if (!elementCreated) {
      return res
        .status(500).json({ error: 'Internal error' });
    }

    if ('error' in elementCreated) {
      return res.status(400).json(elementCreated);
    }

    return res.status(201).json(elementCreated);
  };

  update = async (
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  )
  :Promise<typeof res> => {
    const { body, params: { id } } = req;

    if (!Object.keys(body).length) res.status(400);

    const elementUpdated = await this.service.update(id, body);

    if (id.length < 24) {
      return res
        .status(400)
        .json({ error: ControllerErrors.idMustHave24Char });
    }

    if (!elementUpdated) {
      return res.status(404).json({ error: ControllerErrors.notFound });
    }

    return res.json(elementUpdated);
  };

  delete = async (
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  )
  :Promise<typeof res> => {
    const { id } = req.params;
    if (id.length < 24) {
      return res
        .status(400)
        .json({ error: ControllerErrors.idMustHave24Char });
    }
    const elementDeleted = await this.service.delete(id);
    if (!elementDeleted) {
      return res.status(404).json({ error: ControllerErrors.notFound });
    }
    return res.status(204).json(elementDeleted);
  };
}