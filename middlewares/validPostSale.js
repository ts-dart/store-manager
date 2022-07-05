module.exports = async (sales, model) => {
  const isValidProductId = await model.postSale(false);

  if (!sales.every((sale) => sale.productId)) {
    return { valid: false, status: 400, msg: { message: '"productId" is required' } };
  }
  if (!sales.every((sale) => sale.quantity !== undefined)) {
    return { valid: false, status: 400, msg: { message: '"quantity" is required' } };
  }
  if (!sales.every((sale) => sale.quantity > 0)) {
    return {
      valid: false, status: 422, msg: { message: '"quantity" must be greater than or equal to 1' },
    };
  }
  if (await isValidProductId(sales)) {
    return { valid: false, status: 404, msg: { message: 'Product not found' } };
  }

  return { valid: true, status: null, msg: null };
};
