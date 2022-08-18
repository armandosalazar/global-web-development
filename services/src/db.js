const mysql = require('mysql2');

module.exports = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'webstore',
});
