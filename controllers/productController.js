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

module.exports = {
  getAll,
  getById,
};