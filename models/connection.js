const mysql = require('mysql2/promise');

/* const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE || 'StoreManager',
});
 */

const db = mysql.createPool({
  host: 'localhost',
  user: 'thiago',
  password: 'minhasenhaA1$',
});

module.exports = db;