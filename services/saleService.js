const SaleModel = require('../models/saleModel');

const postSale = async (sales) => { 
  await SaleModel.postSale(sales);
};

module.exports = {
  postSale,
};