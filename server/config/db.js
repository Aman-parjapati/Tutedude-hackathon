const mysql = require('mysql2/promise');
require('dotenv').config();

['DB_HOST','DB_USER','DB_PASSWORD','DB_NAME','JWT_SECRET'].forEach(k=>{
  if (!process.env[k]) throw new Error(`Missing ${k} in .env`);
});

module.exports = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});