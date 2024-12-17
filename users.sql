CREATE DATABASE bookstore;

USE bookstore;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  isbn VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2),
  sold INT DEFAULT 0
);

CREATE TABLE sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  book_id INT,
  quantity INT,
  sale_date DATE,
  FOREIGN KEY (book_id) REFERENCES books(id)
);