const SaleService = require('../services/saleService');

const postSale = async (req, res) => { 
  const response = await SaleService.postSale(req.body);
  if (response.status) return res.status(response.status).send(response.message);
  return res.status(201).send(response);
};

const getSales = async (_req, res) => { 
  const response = await SaleService.getSales();
  return res.status(200).send(response);
};

const getSaleById = async (req, res) => { 
  const response = await SaleService.getSaleById(req.params);
  if (response.status) return res.status(response.status).send(response.message);
  return res.status(200).send(response);
};

module.exports = {
  postSale,
  getSales,
  getSaleById,
};
