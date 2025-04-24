import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'shoppy-redux-db.c5c00c6s66l9.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'Hwangsu94!',
    database: 'hrdb2019',
});

export const db = pool.promise();