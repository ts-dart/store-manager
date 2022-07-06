const sinon = require('sinon');
const SaleService = require('../../../services/saleService');
const SaleModel = require('../../../models/saleModel');
const { expect } = require('chai');

describe('postSale', () => { 
  describe('quando o "productId" não e informado', () => {
    it('faz retornar um erro pois o "productId" não foi informado', async () => { 
      const data = await SaleService.postSale([{ quantity: 1 }]);
      expect(data).to.have.property('status').equal(400);
    });
  });

  describe('quando o "quantity" não e informado', () => { 
    it('faz retornar um erro pois o "quantity" não foi informado', async () => {
      const data = await SaleService.postSale([{ productId: 1 }]);
      expect(data).to.have.property('status').equal(400);
    });
  });

  describe('quando o "quantity" informado e invalido', () => { 
    it('faz retornar um erro pois o "quantity" e invalido', async () => {
      const data = await SaleService.postSale([{ productId: 1, quantity: 0 }]);
      expect(data).to.have.property('status').equal(422);
    });
  });

  describe('quando o "productId" informado e invalido', () => { 
    before(async () => {
      sinon.stub(SaleModel, 'postSale').resolves({ isValidProductId: () => true });
    });

    after(async () => {
      SaleModel.postSale.restore();
    });
    it('faz retornar um erro pois o "productId" e invalido', async () => {
      const data = await SaleService.postSale([{ productId: 100, quantity: 1 }]);
      expect(data).to.have.property('status').equal(404);
    });
  });

  describe('quando os dados passados estão corretos', () => { 
    before(async () => {
      sinon.stub(SaleModel, 'postSale').resolves({ isValidProductId: () => false, itemsSold: [] });
    });

    after(async () => {
      SaleModel.postSale.restore();
    });
    it('faz retornar um erro pois o "productId" e invalido', async () => {
      const data = await SaleService.postSale([{ productId: 1, quantity: 1 }]);
      expect(data).to.have.property('itemsSold');
    });
  });
});
