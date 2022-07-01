const { expect } = require('chai');
const sinon = require('sinon');
const ProductService = require('../../../services/productService');
const ProductModel = require('../../../models/productModel');

describe('pega todos os produtos', () => { 
  describe('quando todos os produtos forem retornados', () => { 
    before(async () => { 
      sinon.stub(ProductModel, 'getAll').resolves({});
    });

    after(async () => { 
      ProductModel.getAll.restore();
    });
    it('faz retornar todos os produtos', async () => { 
      const products = await ProductService.getAll();
      expect(products).to.be.a('object');
    });
  });
});

describe('pega um produto com um id correspondente', () => { 
  before(async () => { 
    sinon.stub(ProductModel, 'getById').resolves({
      id: 2,
      name: 'Traje de encolhimento'
    })
  });

  after(async () => { 
    ProductModel.getById.restore();
  });
  describe('quando for retornado um produto com id correspondente', () => { 
    it('faz uma query no banco de dados, e retornado o produto referente ao id', async () => {
      const product = await ProductService.getById(2);
      expect(product).to.have.a.property('id');
    });
  });
  describe('quando o id não for informado, retorna null', () => { 
    it('faz uma query no banco de dados, e retornado null', async () => {
      const product = await ProductService.getById();
      expect(product).to.be.a('null');
    });
  });
});

describe('cadastra um novo produto', () => { 
  before(async () => { 
    sinon.stub(ProductModel, 'postProduct').resolves({ name: 'shampoo' });
  });

  after(async () => { 
    ProductModel.postProduct.restore();
  });
  describe('quando o produto e cadastrado', () => { 
    it('cadastra um novo produto e retorna o nome do produto cadastrado', async () => { 
      const product = await ProductService.postProduct('shampoo');
      expect(product).to.be.property('name').equals('shampoo');
    });
  });
  describe('quando o nome não e informado', () => { 
    it('tenta cadastrar um novo produto sem informar o nome e retorna um erro', async () => { 
      const product = await ProductService.postProduct();
      expect(product).to.be.equals(400);
    });
  });
  describe('quando o name tem menos de 5 caracteres', () => { 
    it('tenta cadastrar um novo produto informando um nome invalido e retorna um erro', async () => {
      const product = await ProductService.postProduct('abc');
      expect(product).to.be.equals(422);
    });
  });
});
