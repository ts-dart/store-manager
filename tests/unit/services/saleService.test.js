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

describe('getSales/service', () => { 
  before(async () => {
    sinon.stub(SaleModel, 'getSales').resolves([{ saleId:0 }]);
  });

  after(async () => {
    SaleModel.getSales.restore();
  });
  it('faz retornar os dados corretos', async () => {
    const [data] = await SaleService.getSales();
    expect(data).to.have.property('saleId');
  });
});

describe('getSaleById/service', () => {
  describe('quando a validação encontrar um erro', () => {
    before(async () => {
      sinon.stub(SaleModel, 'getSaleById').resolves({ validSale: () => true });
    });

    after(async () => {
      SaleModel.getSaleById.restore();
    });
    it('busca pelo campo "saleId" no db e não o encontra', async () => {
      const data = await SaleService.getSaleById(false);
      expect(data).to.have.property('status').equal(404);
    });
  });
  describe('quando a validação não encontrar um erro', () => {
    before(async () => {
      sinon.stub(SaleModel, 'getSaleById').resolves({ validSale: () => false, data: [{}] });
    });

    after(async () => {
      SaleModel.getSaleById.restore();
    });
    it('busca pelo campo "saleId" no db e não o encontra', async () => {
      const data = await SaleService.getSaleById(true);
      expect(data).to.have.property('data');
    });
  });
});
