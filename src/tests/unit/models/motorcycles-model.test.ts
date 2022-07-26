import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/MotorcycleModel';
import { motorcycleMock } from '../mocks/MotorcycleMock';

describe('Testa o funcionamento da camada model para rota /motorcycles', () => {

  describe('POST /motorcycles', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(motorcycleMock);
    })

    after(() => {
      (Model.create as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const create = await MotorcycleModel.create(motorcycleMock);

      expect(create).to.be.deep.equal(motorcycleMock);
    });
  });

  describe('GET /motorcycles', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([]);
    })

    after(() => {
      (Model.find as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const read = await MotorcycleModel.find();

      expect(read).to.be.deep.equal([]);
    });
  });

  describe('GET /motorcycles/:id', () => {

    before(() => {
      sinon.stub(Model, 'findById').resolves(motorcycleMock);
    })

    after(() => {
      (Model.findById as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const readOne = await MotorcycleModel.findById('4edd40c86762e0fb12000003');
      expect(readOne).to.be.equal(motorcycleMock);
    })
  })

  describe('PUT /motorcycles/:id', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndUpdate').resolves(motorcycleMock);
    })

    after(() => {
      (Model.findOneAndUpdate as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      const update = await MotorcycleModel.findByIdAndUpdate('4edd40c86762e0fb12000003', motorcycleMock);
      expect(update).to.be.equal(motorcycleMock);
    })
  })

  describe('DELETE /motorcycles/:id', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(motorcycleMock);
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      const deleteCar = await MotorcycleModel.findByIdAndDelete('4edd40c86762e0fb12000003');
      expect(deleteCar).to.be.equal(motorcycleMock);
    })
  })
});