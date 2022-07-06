const SaleService = require('../services/saleService');

const postSale = async (req, res) => { 
  const response = await SaleService.postSale(req.body);
  if (response.status) return res.status(response.status).send(response.message);
  return res.status(201).send(response);
};

module.exports = {
  postSale,
};