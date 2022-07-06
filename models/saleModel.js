const dbSales = require('./connection');

const validationProductId = async (sales) => {
  const [data] = await dbSales.query('select * from StoreManager.products');
  let res = false;

  sales.forEach(({ productId }) => { 
    const result = data.map((pro) => pro.id === productId);
    res = result.every((r) => r === false);
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
        'insert into StoreManager.sales_products (sale_id, product_id, quantity) values (?,?,?)',
        [lastSaleId + 1, sale.productId, sale.quantity],
      );
    });

    return { id: lastSaleId + 1, itemsSold: sales };
  };

  if (args) return post(args);
  const isValidProductId = (sales) => validationProductId(sales).then((data) => data);
  return { isValidProductId };
};

const getSales = async () => { 
  const [data] = await dbSales.query(
    `select * from StoreManager.sales as s 
    inner join StoreManager.sales_products as sp on s.id = sp.sale_id`,
  );
  
  return data.map(({ date, id, product_id: pi, quantity, sale_id: si }) => {
    const obj = { date, id, productId: pi, quantity, saleId: si };
    return obj;
  });
};

const getSaleById = async (args) => { 
  const getById = async ({ id }) => { 
    const [data] = await dbSales.query(
      `select date, product_id, quantity from StoreManager.sales_products as sp 
      inner join StoreManager.sales as s on sp.sale_id = ?
      group by s.date, sp.product_id, sp.quantity
      order by product_id asc`, [id],
      );
    
    return data.map(({ date, product_id: pi, quantity }) => ({ date, productId: pi, quantity }));
  };

  if (args) return getById(args);

  const validSale = async ({ id }) => { 
    const [data] = await dbSales.query('select * from StoreManager.sales where id = ?', [id]);
    if (data.length < 1) return true;
    return false;
  };
  return { validSale };
};

module.exports = {
  postSale,
  getSales,
  getSaleById,
};
