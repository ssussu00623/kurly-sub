import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'ssussu-db.cpgwkwuecf57.ap-northeast-2.rds.amazonaws.com',
    port: 3306,
    user: 'admin',
    password: 'ssussu1234',
    database: 'hrdb2019',
});

export const db = pool.promise();