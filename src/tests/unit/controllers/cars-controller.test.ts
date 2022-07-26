import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import { Request, Response, NextFunction } from 'express';
import CarService from '../../../services/CarService';
import CarController from '../../../controllers/CarController';
import { carMock } from '../mocks/CarMock';

describe('Testa o funcionamento da camada controller para rota /cars', () => {

  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  describe('POST /cars', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(CarService, 'create').resolves();
    })

    after(() => {
      (CarService.create as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const create = await CarController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201));
      expect((res.json as sinon.SinonStub).calledWith(carMock));
    });
  });

  // describe('GET /cars', () => {
  //   before(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);
  //     req.body = [carMock];
  //     sinon.stub(CarService, 'getAll').resolves([]);
  //   })

  //   after(() => {
  //     (CarService.getAll as SinonStub).restore();
  //   })

  //   it('Ocorre com sucesso', async () => {
  //     const read = await CarController.getAll(req, res);

  //     expect(read).to.be.deep.equal([]);
  //   });
  // });

  describe('GET /cars/:id', () => {

    before(() => {
      req.params = { id: '4edd40c86762e0fb12000003' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(CarService, 'getById').resolves();
    })

    after(() => {
      (CarService.getById as SinonStub).restore();
    })
    it('Ocorre sucesso', async () => {
      await CarController.getById(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200));
      expect((res.json as sinon.SinonStub).calledWith(carMock));
    })
  })

  describe('PUT /cars/:id', () => {

    before(() => {
      req.params = { id: '4edd40c86762e0fb12000003' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = carMock;
      sinon.stub(CarService, 'update').resolves();
    })

    after(() => {
      (CarService.update as SinonStub).restore();
    })
    it('Ocorre sucesso', async () => {
      await CarController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200));
      expect((res.json as sinon.SinonStub).calledWith(carMock));
    })
  })

  describe('DELETE /cars/:id', () => {
    before(() => {
      req.params = { id: '4edd40c86762e0fb12000003' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(CarService, 'delete').resolves();
    })

    after(() => {
      (CarService.delete as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      await CarController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204));
      expect((res.json as sinon.SinonStub).calledWith(carMock));
    })
  })
})
