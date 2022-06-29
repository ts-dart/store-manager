const mysql = require('mysql2/promise');

const dbProducts = mysql.createPool({
  host: 'localhost',
  user: 'thiago',
  password: 'minhasenhaA1$',
});

module.exports = dbProducts;