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
