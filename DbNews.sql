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
    id INT AUTO_INCREMENT PRIMARY KEY,
    theLoai VARCHAR(100),
    tieuDe VARCHAR(100),
    uri VARCHAR(1000),
    noiDung TEXT
);

INSERT INTO users (fullName, email, password, permission)
VALUES ('Admin', 'admin@gmail.com', 'admin123', 'admin');


select * from posts;
select * from users