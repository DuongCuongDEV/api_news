const mysql = require('mysql2');

// Tạo kết nối
const connection = mysql.createConnection({
  host: 'localhost',     // Địa chỉ máy chủ MySQL
  user: 'root',      // Tên người dùng MySQL
  password: '12345678',  // Mật khẩu người dùng MySQL
  database: 'news'   // Tên cơ sở dữ liệu MySQL
});

module.exports = connection;

// const mysql = require('mysql2');

// Tạo kết nối
// const connection = mysql.createConnection({
//   host: '103.75.184.19',     // Địa chỉ máy chủ MySQL
//   user: 'rpgenkhhhosting_administrator',      // Tên người dùng MySQL
//   password: 'kIx&(1EKDnBA',  // Mật khẩu người dùng MySQL
//   database: 'rpgenkhhhosting_News'   // Tên cơ sở dữ liệu MySQL
// });

// module.exports = connection;