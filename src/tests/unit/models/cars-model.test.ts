import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import { Model } from 'mongoose';
import CarModel from '../../../models/CarModel';
import { carMock } from '../mocks/CarMock';

describe('Testa o funcionamento da camada model para rota /cars', () => {

  describe('POST /cars', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(carMock);
    })

    after(() => {
      (Model.create as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const create = await CarModel.create(carMock);

      expect(create).to.be.deep.equal(carMock);
    });
  });

  describe('GET /cars', () => {
    before(() => {
      sinon.stub(Model, 'find').resolves([]);
    })

    after(() => {
      (Model.find as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const read = await CarModel.find();

      expect(read).to.be.deep.equal([]);
    });
  });

  describe('GET /cars/:id', () => {

    before(() => {
      sinon.stub(Model, 'findById').resolves(carMock);
    })

    after(() => {
      (Model.findById as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const readOne = await CarModel.findById('4edd40c86762e0fb12000003');
      expect(readOne).to.be.equal(carMock);
    })
  })

  describe('PUT /cars/:id', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndUpdate').resolves(carMock);
    })

    after(() => {
      (Model.findOneAndUpdate as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      const update = await CarModel.findByIdAndUpdate('4edd40c86762e0fb12000003', carMock);
      expect(update).to.be.equal(carMock);
    })
  })

  describe('DELETE /cars/:id', () => {
    before(() => {
      sinon.stub(Model, 'findOneAndDelete').resolves(carMock);
    })

    after(() => {
      (Model.findOneAndDelete as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      const deleteCar = await CarModel.findByIdAndDelete('4edd40c86762e0fb12000003');
      expect(deleteCar).to.be.equal(carMock);
    })
  })
});