const mysql = require('mysql2')


let pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: "test1",
    password: "root",
    connectionLimit: 10,
  })
  .promise();


async function cleanup() {
    await pool.end();
}

module.exports = {pool, cleanup};