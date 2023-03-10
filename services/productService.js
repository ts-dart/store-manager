const ProductModel = require('../models/productModel');

const getAll = async () => {
  const products = await ProductModel.getAll();
  return products;
};

const getById = async (id) => {
  if (!id) return null;
  const product = await ProductModel.getById(id);

  return product;
};

const postProduct = async (name) => {
  if (!name) return 400;
  if (name.length < 5) return 422;
  
  const product = await ProductModel.postProduct(name);
  return product;
};

module.exports = {
  getAll,
  getById,
  postProduct,
};