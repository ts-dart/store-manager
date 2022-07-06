const chai = require('chai');
const sinon = require('sinon');

const SaleModel = require('../../../models/saleModel');
const dbSales = require('../../../models/connection');

describe('postSale/model', async () => { 
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
      const { isValidProductId } = await SaleModel.postSale(false);
      chai.expect(await isValidProductId([{ productId: null }, { productId: null }])).to.be.equal(true);
    });
    it('busca pelo campo "productId" no db e o encontra', async () => {
      const { isValidProductId } = await SaleModel.postSale(false);
      chai.expect(await isValidProductId([{ productId: 1 }, { productId: null }])).to.be.equal(true);
    });
  });
});

describe('getSales/model', () => { 
  before(async () => { 
    sinon.stub(dbSales, 'query').resolves([[{date:0, id:0, product_id:0, quantity:0, sale_id:0}]]);
  });
  after(async () => { 
    dbSales.query.restore();
  });
  it('faz retornar todas as vendas do db', async () => { 
    const [data] = await SaleModel.getSales();
    chai.expect(data).to.have.property('saleId');
  });
});

describe('getSaleById/model', () => { 
  describe('quando forem feitas validações', async () => {
    describe('quando a validação encontrar um erro', () => {
      before(async () => {
        sinon.stub(dbSales, 'query').resolves([[]]);
      });

      after(async () => {
        dbSales.query.restore();
      });
      it('busca pelo campo "saleId" no db e não o encontra', async () => {
        const { validSale } = await SaleModel.getSaleById(false);
        chai.expect(await validSale({ id: null })).to.be.equal(true);
      });
    });
    describe('quando a validação não encontrar um erro', () => {
      before(async () => {
        sinon.stub(dbSales, 'query').resolves([[{}]]);
      });

      after(async () => {
        dbSales.query.restore();
      });
      it('busca pelo campo "saleId" no db e não o encontra', async () => {
        const { validSale } = await SaleModel.getSaleById(false);
        chai.expect(await validSale({ id: 2 })).to.be.equal(false);
      });
    });
  });
  describe('quando a requisição for feita corretamente', async () => { 
    before(async () => {
      sinon.stub(dbSales, 'query').resolves([[{ date:0 }]]);
    });

    after(async () => {
      dbSales.query.restore();
    });
    it('busca pelo campo "saleId" no db e o encontra', async () => {
      const [data] = await SaleModel.getSaleById({ id: 2 });
      chai.expect(data).to.have.property('date');
    });
  });
});
