const SaleModel = require('../models/saleModel');
const validPostSale = require('../middlewares/validPostSale');

const postSale = async (sales) => { 
  const { valid, status, msg } = await validPostSale(sales, SaleModel);

  if (valid) {
    const data = await SaleModel.postSale(sales);
    return data;
  }
  return { status, msg };
};

module.exports = {
  postSale,
};
