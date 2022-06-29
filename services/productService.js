const PoductModel = require('../models/poductModel');

const getAll = async () => {
  const products = await PoductModel.getAll();
  return products;
};

const getById = async (id) => {
  if (!id) return null;
  const product = await PoductModel.getById(id);

  return product;
};

module.exports = {
  getAll,
  getById,
};