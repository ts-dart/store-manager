const dbProducts = require('./connection');

const getAll = async () => { 
  const [products] = await dbProducts.query(`
    select * from StoreManager.products order by id asc;
  `);
  return products;
};

const getById = async (id) => { 
  const [[product]] = await dbProducts.query(`
    select * from StoreManager.products where id = ?
  `,
    [id]);
  
  return product;
};

module.exports = {
  getAll,
  getById,
};