const mysql = require('mysql2');
//MySQLの接続設定
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aitalk'
}).promise();

module.exports = connection;