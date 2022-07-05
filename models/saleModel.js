const dbSales = require('./connection');

const validationProductId = async (sales) => {
  const [data] = await dbSales.query('select * from StoreManager.products');
  let res = false;

  sales.forEach(({ productId }) => { 
    const result = data.map((pro) => pro.id === productId);
    if (result.every((r) => r === false)) res = true;
  });

  return res;
};

const postSale = async (args) => {
  const post = async (sales) => {
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

    return { id: lastSaleId + 1, itemsSold: sales };
  };
    
  const isValidProductId = (sales) => validationProductId(sales).then((data) => data);

  if (args) return post(args);
  return isValidProductId;
};

module.exports = {
  postSale,
};
