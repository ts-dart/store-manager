const dbSales = require('./connection');

const postSale = async (sales) => { 
  await dbSales.query('insert into StoreManager.sales (date) values (NOW())');
  const [[{ 'max(sale_id)': lastSaleId }]] = await dbSales
    .query('select max(sale_id) from StoreManager.sales_products');

  sales.forEach(async (sale) => {     
    await dbSales.query(
      `insert into StoreManager.sales_products (sale_id, product_id, quantity)
      values (?,?,?)`,
      [lastSaleId + 1, sale.productId, sale.quantity],
    );
  });
};

module.exports = {
  postSale,
};
