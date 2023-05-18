const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');

const db = require('./connect');
// Middleware để xử lý các yêu cầu trước khi đến các tuyến đường (routes)
app.use(express.json());



// Cấu hình multer để xử lý tải lên ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Thư mục để lưu trữ ảnh tải lên
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      cb(null, `${timestamp}_${file.originalname}`); // Đặt tên file dựa trên thời gian và tên gốc
    }
  });
  
  const upload = multer({ storage });

  app.get('/posts', (req, res) => {
    // Thực hiện truy vấn SQL bằng kết nối đã nhập (import) từ db.js
    db.query('SELECT * FROM posts', (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/posts', upload.single('image'), (req, res) => {
    const { id_user, title, content } = req.body;
    const image = req.file.filename;
  
    const post = {
        id_user, title, image, content
    };
  
    db.query('INSERT INTO posts SET ?', post, (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else {
        res.status(200).send('Bài viết đã được thêm thành công');
      }
    });
  });


app.get('/users', (req, res) => {
    // Thực hiện truy vấn SQL bằng kết nối đã nhập (import) từ db.js
    db.query('SELECT * FROM users', (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else {
        res.json(results);
      }
    });
  });

  app.post('/users', (req, res) => {
    const { fullName, email, password, permission } = req.body;
  
    const user = { fullName, email, password, permission };
  
    db.query('INSERT INTO users SET ?', user, (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else {
        res.status(201).send('Người dùng đã được tạo thành công');
      }
    });
  });

  app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
  
    db.query('DELETE FROM users WHERE id = ?', userId, (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Người dùng không tồn tại');
      } else {
        res.status(200).send('Người dùng đã được xoá thành công');
      }
    });
  });

  app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const { fullName, email, password, permission } = req.body;
  
    const user = { fullName, email, password, permission };
  
    db.query('UPDATE users SET ? WHERE id = ?', [user, userId], (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Người dùng không tồn tại');
      } else {
        res.status(200).send('Thông tin người dùng đã được cập nhật thành công');
      }
    });
  });
// Lắng nghe kết nối từ cổng đã chỉ định
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
