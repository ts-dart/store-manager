const chai = require('chai');
const sinon = require('sinon');

const SaleModel = require('../../../models/saleModel');
const dbSales = require('../../../models/connection');

describe('postSale', async () => { 
  describe('quando os dados forem inseridos', async () => { 
    before(async () => { 
      sinon.stub(dbSales, 'query').resolves([[{ itemsSold: [] }]]);
    });

    after(async () => { 
      dbSales.query.restore();
    });
    it('insere novos dados no banco de dados', async () => { 
      const data = await SaleModel.postSale([{ productId: 1, quantity: 2 }, { productId: 2, quantity: 1 }]);
      chai.expect(data).to.have.property('itemsSold');
    });
  });

  describe('quando forem feitas validações', async () => { 
    before(async () => {
      sinon.stub(dbSales, 'query').resolves([[{ id: 1 }, { id: 2 }, { id: 3 }]]);
    });

    after(async () => {
      dbSales.query.restore();
    });
    it('busca pelo campo "productId" no db e não o encontra', async () => {
      const data = await SaleModel.postSale(false);
      chai.expect(await data([{ productId: null }, { productId: null }])).to.be.equal(true);
    });
    it('busca pelo campo "productId" no db e o encontra', async () => {
      const data = await SaleModel.postSale(false);
      chai.expect(await data([{ productId: 1 }, { productId: null }])).to.be.equal(true);
    });
  });
});
