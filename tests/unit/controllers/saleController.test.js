const chai = require('chai');
const sinon = require('sinon');

const SaleController = require('../../../controllers/saleController');
const SaleService = require('../../../services/saleService');

describe('postSale/controller', () => {
  describe('quando a requisição retorna um erro', () => { 
    const res = {};
    const req = { body: {} };

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(SaleService, 'postSale').resolves({ 
        status: 404,
        message: { message: 'Product not found' }
      });
    });

    after(async () => {
      SaleService.postSale.restore();
    });
    it('faz a requisição retornar um erro', async () => { 
      await SaleController.postSale(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.send.getCall(0).args[0]).to.have.property('message')
    });
  });

  describe('quando a requisição e bem sucedida', () => {
    const res = {};
    const req = { body: {} };

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(SaleService, 'postSale').resolves({ itemsSold: [] });
    });

    after(async () => {
      SaleService.postSale.restore();
    });
    it('faz a requisição retornar retornar o que foi solicitado', async () => {
      await SaleController.postSale(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(201);
      chai.expect(res.send.getCall(0).args[0]).to.have.property('itemsSold')
    });
  });
});

describe('getSales/controller', () => {
  describe('quando a requisição e bem sucedida', () => {
    const res = {};
    const req = {};

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(SaleService, 'getSales').resolves({ saleId: 0 });
    });

    after(async () => {
      SaleService.getSales.restore();
    });
    it('faz a requisição retornar retornar o que foi solicitado', async () => {
      await SaleController.getSales(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.send.getCall(0).args[0]).to.have.property('saleId')
    });
  });
});

describe('getSaleById/controller', () => {
  describe('quando a requisição retorna um erro', () => {
    const res = {};
    const req = { params: null };

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(SaleService, 'getSaleById').resolves({
        status: 404,
        message: { message: 'Sale not found' }
      });
    });

    after(async () => {
      SaleService.getSaleById.restore();
    });
    it('faz a requisição retornar um erro', async () => {
      await SaleController.getSaleById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(404);
      chai.expect(res.send.getCall(0).args[0]).to.have.property('message')
    });
  });
  describe('quando a requisição e bem sucedida', () => {
    const res = {};
    const req = { params: 2 };

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(SaleService, 'getSaleById').resolves({ saleId: 2 });
    });

    after(async () => {
      SaleService.getSaleById.restore();
    });
    it('faz a requisição retornar retornar o que foi solicitado', async () => {
      await SaleController.getSaleById(req, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.send.getCall(0).args[0]).to.have.property('saleId')
    });
  });
});
