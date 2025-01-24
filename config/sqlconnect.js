const mysql = require("mysql2");
const env = require("./env");

function createConnection() {
  const pool = mysql.createPool({
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 20, 
    queueLimit: 0, 
  });

  console.log("Connection pool created successfully for SQL Database");

  return pool.promise(); 
}

module.exports = { createConnection };
