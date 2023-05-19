const express = require('express');
const app = express();
const port = 3000;
const multer = require('multer');

const db = require('./connect');
app.use(express.json());



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const timestamp = Date.now();
      cb(null, `${timestamp}_${file.originalname}`); 
    }
  });
  
  const upload = multer({ storage });

  app.get('/posts', (req, res) => {
    db.query('SELECT * FROM posts', (error, results) => {
      if (error) {
        console.error('Lỗi truy vấn:', error);
        res.status(500).send('Lỗi server');
      } else {
        res.json(results);
      }
    });
  });

  app.delete('/posts/:id', (req, res) => {
    const postId = req.params.id;
  
    const sqlDelete = `DELETE FROM posts WHERE id_post = ${postId}`;
  
    db.query(sqlDelete, (error, results) => {
      if (error) {
        console.error('Lỗi xoá bài viết:', error);
        res.status(500).json({ error: 'Lỗi xoá bài viết' });
        return;
      }
      console.log('Bài viết đã được xoá thành công');
      res.json({ message: 'Bài viết đã được xoá thành công' });
    });
  });
  
  app.put('/posts/:id', upload.single('image'), (req, res) => {
    const postId = req.params.id;
  const { title, content } = req.body;
  const imageName = req.file.filename; 


  const sqlUpdate = `UPDATE posts SET title = ?, content = ?, image = ? WHERE id_post = ${postId}`;
  const values = [title, content, imageName];

  db.query(sqlUpdate,values, (error, results) => {
    if (error) {
      console.error('Lỗi cập nhật bài viết:', error);
      res.status(500).json({ error: 'Lỗi cập nhật bài viết' });
      return;
    }
    console.log('Bài viết đã được cập nhật thành công');
    res.json({ message: 'Bài viết đã được cập nhật thành công' });
  });
});



  app.post('/posts', upload.single('image'), (req, res) => {
    const { title, content } = req.body;
    const image = req.file.filename;
  
    const post = {
         title, image, content
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
