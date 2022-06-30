const ProductService = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();
  return res.status(200).send(products);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const product = await ProductService.getById(id);
  
  if (!product) return res.status(404).json({ message: 'Product not found' });
  return res.status(200).send(product);
};

const postProduct = async (req, res) => {
  const { name } = req.body;
  const product = await ProductService.postProduct(name);

  if (product === 422) { 
    return res.status(422).send({ message: '"name" length must be at least 5 characters long' });
  }

  if (product === 400) return res.status(400).send({ message: '"name" is required' });
  return res.status(201).send(product);
};

module.exports = {
  getAll,
  getById,
  postProduct,
};