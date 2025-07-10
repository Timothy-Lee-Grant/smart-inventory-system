import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_db_sql',
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool;