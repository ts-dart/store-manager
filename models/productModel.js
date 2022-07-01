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
  `, [id]);
  
  return product;
};

const postProduct = async (name) => {
  await dbProducts.query('insert into StoreManager.products (name) values (?)', [name]);
  const [[product]] = await dbProducts.query(`
    select id, name from StoreManager.products where name = ?;
  `, [name]);

  return product;
};

module.exports = {
  getAll,
  getById,
  postProduct,
};