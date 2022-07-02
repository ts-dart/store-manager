const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const ProductService = require('../../../services/productService');
const ProductController = require('../../../controllers/productController');
const { expect } = require('chai');

chai.use(chaiAsPromised);

describe('controllers/productController', () => {
  describe('getAll', () => {
    const ex = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' }
    ];
    const res = {};

    before(async () => {
      res.status = sinon.stub().returns(res);
      res.send = sinon.stub().returns();

      sinon.stub(ProductService, 'getAll').resolves(ex);
    });

    after(async () => ProductService.getAll.restore());
    it('faz retornar todos os produtos, testa o status e o send', async () => { 
      await ProductController.getAll({}, res);
      chai.expect(res.status.getCall(0).args[0]).to.equal(200);
      chai.expect(res.send.getCall(0).args[0]).to.equal(ex);
    });
  });

  describe('getById', () => { 
    const ex = {
      id: 2,
      name: 'Traje de encolhimento'
    };
    const res = {};
    const req = { params: { id: 2 } };
    
    describe('quando falhar por que a requisição falhou', () => { 
      before(async () => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(false);
      });

      after(async () => ProductService.getById.restore());
      it('faz a função falhar pois não foi passado o objeto', async () => {
        await ProductController.getById(req, res);
        chai.expect(res.status.getCall(0).args[0]).to.equal(404);
        chai.expect(res.json.getCall(0).args[0])
          .to.have.a.property('message').equal('Product not found');
      });
    });
    describe('quando não falhar', () => { 
      before(async () => {
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();

        sinon.stub(ProductService, 'getById').resolves(ex);
      });

      after(async () => ProductService.getById.restore());
      it('faz retornar um produto com id correspondente', async () => {
        await ProductController.getById(req, res);
        chai.expect(res.status.getCall(0).args[0]).to.equal(200);
        chai.expect(res.send.getCall(0).args[0]).to.equal(ex);
      });
    });
  });

  describe('postProduct', () => { 
    describe('camada de servico retorna um erro pois o name informado e invalido', () => { 
      const req = { body: { name: 'abc' } };
      const res = {};

      before(async () => { 
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();

        sinon.stub(ProductService, 'postProduct').resolves(422);
      });

      after(async () => { 
        ProductService.postProduct.restore();
      });
      it('faz a a função retornar um erro pois o service retorna um erro', async () => { 
        await ProductController.postProduct(req, res);
        expect(res.status.getCall(0).args[0]).to.equal(422);
        expect(res.send.getCall(0).args[0])
          .to.have.property('message').equal('"name" length must be at least 5 characters long');
      });
    });

    describe('camada de servico retorna um erro pois o name não foi informado', () => { 
      const req = { body: {} };
      const res = {};

      before(async () => {
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();

        sinon.stub(ProductService, 'postProduct').resolves(400);
      });

      after(async () => {
        ProductService.postProduct.restore();
      });
      it('faz a a função retornar um erro pois o service retorna um erro', async () => { 
        await ProductController.postProduct(req, res);
        expect(res.status.getCall(0).args[0]).to.equal(400);
        expect(res.send.getCall(0).args[0])
          .to.have.property('message').equal('"name" is required');
      });
    });

    describe('quando o produto for cadastrado corretamente', () => { 
      const ex = { name: 'abcde' };
      const req = { body: { name: 'abcde' } };
      const res = {};

      before(async () => {
        res.status = sinon.stub().returns(res);
        res.send = sinon.stub().returns();

        sinon.stub(ProductService, 'postProduct').resolves(ex);
      });

      after(async () => {
        ProductService.postProduct.restore();
      });
      it('faz a a função retornar um erro pois o service retorna um erro', async () => {
        await ProductController.postProduct(req, res);
        expect(res.status.getCall(0).args[0]).to.equal(201);
        expect(res.send.getCall(0).args[0])
          .to.have.property('name').equal('abcde');
      });
    });
  });
});
