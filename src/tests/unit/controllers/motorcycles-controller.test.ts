import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import { Request, Response, NextFunction } from 'express';
import MotorcycleService from '../../../services/MotorcycleService';
import MotorcycleController from '../../../controllers/MotorcycleController';
import { motorcycleMock } from '../mocks/MotorcycleMock';

describe('Testa o funcionamento da camada controller para rota /motorcycles', () => {

  const req = {} as Request;
  const res = {} as Response;
  const next = {} as NextFunction;

  describe('POST /motorcycles', () => {
    before(() => {
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = motorcycleMock;
      sinon.stub(MotorcycleService, 'create').resolves();
    })

    after(() => {
      (MotorcycleService.create as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const create = await MotorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201));
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock));
    })
  })

  // describe('GET /motorcycles', () => {
  //   before(() => {
  //     res.status = sinon.stub().returns(res);
  //     res.json = sinon.stub().returns(res);
  //     req.body = [motorcycleMock];
  //     sinon.stub(MotorcycleService, 'getAll').resolves([]);
  //   })

  //   after(() => {
  //     (MotorcycleService.getAll as SinonStub).restore();
  //   })

  //   it('Ocorre com sucesso', async () => {
  //     const read = await MotorcycleController.getAll(req, res);

  //     expect(read).to.be.deep.equal([]);
  //   })
  // })

  describe('GET /motorcycles/:id', () => {

    before(() => {
      req.params = { id: '4edd40c86762e0fb12000003' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = motorcycleMock;
      sinon.stub(MotorcycleService, 'getById').resolves();
    })

    after(() => {
      (MotorcycleService.getById as SinonStub).restore();
    })
    it('Ocorre sucesso', async () => {
      await MotorcycleController.getById(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200));
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock));
    })
  })

  describe('PUT /motorcycles/:id', () => {

    before(() => {
      req.params = { id: '4edd40c86762e0fb12000003' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      req.body = motorcycleMock;
      sinon.stub(MotorcycleService, 'update').resolves();
    })

    after(() => {
      (MotorcycleService.update as SinonStub).restore();
    })
    it('Ocorre sucesso', async () => {
      await MotorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200));
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock));
    })
  })

  describe('DELETE /motorcycles/:id', () => {
    before(() => {
      req.params = { id: '4edd40c86762e0fb12000003' } as any;
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      sinon.stub(MotorcycleService, 'delete').resolves();
    })

    after(() => {
      (MotorcycleService.delete as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      await MotorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204));
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMock));
    })
  })
})
