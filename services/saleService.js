const SaleModel = require('../models/saleModel');

const postSale = async (sales) => { 
  const { isValidProductId } = await SaleModel.postSale(false);

  if (!sales.every((sale) => sale.productId)) {
    return { status: 400, message: { message: '"productId" is required' } };
  }
  if (!sales.every((sale) => sale.quantity !== undefined)) {
    return { status: 400, message: { message: '"quantity" is required' } };
  }
  if (!sales.every((sale) => sale.quantity > 0)) {
    return {
      status: 422, message: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  if (await isValidProductId(sales)) {
    return { status: 404, message: { message: 'Product not found' } };
  }

  const data = await SaleModel.postSale(sales);
  return data;
};

const getSales = async () => { 
  const data = await SaleModel.getSales();
  return data;
};

const getSaleById = async (id) => { 
  const { validSale } = await SaleModel.getSaleById(false);

  if (await validSale(id)) return { status: 404, message: { message: 'Sale not found' } };
  const data = await SaleModel.getSaleById(id);
  return data;
};

module.exports = {
  postSale,
  getSales,
  getSaleById,
};
