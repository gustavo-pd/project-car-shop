import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import { Model } from 'mongoose';
import MotorcycleService from '../../../services/MotorcycleService';
import { motorcycleMock } from '../mocks/MotorcycleMock';

describe('Testa o funcionamento da camada service para rota /motorcycles', () => {

  describe('POST /motorcycles', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(motorcycleMock);
    })

    after(() => {
      (Model.create as SinonStub).restore();
    })

    it('Ocorre com sucesso', async () => {
      const create = await MotorcycleService.create(motorcycleMock);

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
      const read = await MotorcycleService.getAll();

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
      const readOne = await MotorcycleService.getById('4edd40c86762e0fb12000003');
      expect(readOne).to.be.equal(motorcycleMock);
    })
  })

  // describe('PUT /motorcycles/:id', () => {

  //   before(() => {
  //     sinon.stub(Model, 'findOneAndUpdate').resolves();
  //   })

  //   after(() => {
  //     sinon.restore();
  //   })
  //   it('Ocorre com sucesso', async () => {
  //     const update = await MotorcycleService.update('4edd40c86762e0fb12000003', motorcycleMock);
  //     expect(update).to.be.equal(motorcycleMock);
  //   })
  // })

  describe('DELETE /motorcycles/:id', () => {
    before(() => {
      sinon.stub(Model, 'findById').resolves(motorcycleMock);
      sinon.stub(Model, 'findOneAndDelete').resolves(motorcycleMock);
    })

    after(() => {
      (Model.findById as SinonStub).restore();
      (Model.findOneAndDelete as SinonStub).restore();
    })
    it('Ocorre com sucesso', async () => {
      const deleteCar = await MotorcycleService.delete('4edd40c86762e0fb12000003');
      expect(deleteCar).to.be.equal(motorcycleMock);
    })
  })
});