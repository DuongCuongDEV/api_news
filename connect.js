const mysql = require('mysql2');

// Tạo kết nối
const connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '12345678',
  database: 'news'
});

module.exports = connection;
