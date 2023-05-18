create database news;
use news;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100) NOT NULL,
    permission VARCHAR(50) NOT NULL DEFAULT 'standard'
);


CREATE TABLE posts (
    id_post INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    title VARCHAR(100),
    image VARCHAR(255),
    content TEXT,
    FOREIGN KEY (id_user) REFERENCES users(id)
);

INSERT INTO users ( fullName, email, password, permission)
VALUES ('Alice', 'alice@example.com', 'password123','admin');
INSERT INTO users ( fullName, email, password, permission)
VALUES ('Bob', 'bob@example.com', 'password456', 'user');
INSERT INTO posts ( id_user, title, image, content)
VALUES (1, 'First Post', 'image1.jpg', 'This is the content of the first post.');
INSERT INTO posts ( id_user, title, image, content)
VALUES (1, 'Second Post', 'image2.jpg', 'This is the content of the second post.');
INSERT INTO posts ( id_user, title, image, content)
VALUES (2, 'Third Post', 'image3.jpg', 'This is the content of the third post.');

select * from users