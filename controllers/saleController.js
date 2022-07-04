const SaleService = require('../services/saleService');

const postSale = async (req, _res) => { 
  await SaleService.postSale(req.body);
};

module.exports = {
  postSale,
};