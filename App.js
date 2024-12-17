const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// ตั้งค่า middleware
app.use(bodyParser.urlencoded({ extended: true }));

// เชื่อมต่อกับฐานข้อมูล MySQL
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',  // เปลี่ยนเป็น user ของคุณ
  password: '',  // เปลี่ยนเป็นรหัสผ่านของคุณ
  database: 'bookstore'  // ชื่อฐานข้อมูล
});

// Endpoint สำหรับการดึงข้อมูลหนังสือที่ชื่อมีตัวอักษร "o"
app.get('/query-1', (req, res) => {
  pool.query("SELECT * FROM books WHERE title LIKE '%o%'", (err, results) => {
    if (err) {
      res.status(500).send('Error occurred');
    } else {
      res.json(results);
    }
  });
});

// Endpoint สำหรับคำนวณจำนวนหนังสือที่ขายออก
app.get('/query-2', (req, res) => {
  pool.query("SELECT COUNT(*) AS sold_books FROM sales", (err, results) => {
    if (err) {
      res.status(500).send('Error occurred');
    } else {
      res.json(results);
    }
  });
});

// Endpoint สำหรับแสดง ISBN ของหนังสือที่ขาย
app.get('/query-3', (req, res) => {
    pool.query("SELECT isbn FROM books WHERE sold = 1", (err, results) => {
        if (err) {
          res.status(500).send('Error occurred');
        } else {
          res.json(results);
        }
      });
    });
// Endpoint สำหรับคำนวณรายได้รวมจากการขายหนังสือ
app.get('/query-4', (req, res) => {
  pool.query("SELECT SUM(price) AS total_revenue FROM sales JOIN books ON sales.book_id = books.id", (err, results) => {
    if (err) {
      res.status(500).send('Error occurred');
    } else {
      res.json(results);
    }
  });
});

// เปิดเซิร์ฟเวอร์ที่พอร์ต 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});