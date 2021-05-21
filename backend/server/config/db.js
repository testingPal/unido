import * as dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2';

export const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  connectionLimit: 10
});

export const promisePool = pool.promise();

export const connectDB = pool.getConnection((err, connection) => {
  if (err) throw err;
  //TODO: capturar los errores más comunes

  promisePool.getConnection();

  console.log('Database connection established');
  return;
});
