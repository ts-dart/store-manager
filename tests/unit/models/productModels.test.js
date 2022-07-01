const { expect } = require('chai');
const sinon = require('sinon');
const dbProducts = require('../../../models/connection');
const ProductModel = require('../../../models/productModel');

describe('pega todos os produtos', () => { 
  describe('quando os dados são retornados', () => {
    before(async () => {
      sinon.stub(dbProducts, 'query').resolves([{}]);
    });

    after(async () => {
      dbProducts.query.restore();
    });
    it('faz uma query no banco de dados, e todos os dados são retornados', async () => { 
      const products = await ProductModel.getAll();
      expect(products).to.be.a('object');
    });
  });
});

describe('pega um produco com um id correspondente', () => { 
  describe('quando e retornado o produto referente ao id', () => { 
    before(async () => { 
      sinon.stub(dbProducts, 'query').resolves([[{
        id: 2,
        name: 'Traje de encolhimento'
      }]]);
    });

    after(async () => { 
      dbProducts.query.restore();
    });
    it('faz uma query no banco de dados, e retornado o produto referente ao id', async () => {
      const product = await ProductModel.getById(2);
      expect(product).to.have.a.property('id');
    });
  });
});

describe('insere um novo produto ao bd', () => { 
  describe('quando um novo produto for inserido', () => {
    before(async () => { 
      sinon.stub(dbProducts, 'query').resolves([[{ name: 'toalha'}]]);
    });

    after(async () => { 
      dbProducts.query.restore();
    });
    it('insere um novo produto', async () => { 
      const product = await ProductModel.postProduct('toalha');
      expect(product).to.be.property('name').equals('toalha');
    });
  });
});
