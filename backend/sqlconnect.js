// sqlconnect.js
const sql = require("mysql2");
require('dotenv').config();

function createConnection() {
  const con = sql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
    database: "FC",
  });

  con.connect((error) => {
    if (error) {
      console.log(error);
      console.error("Couldn't connect to SQL Database");
    } else {
      console.log("Connected to SQL Database");
    }
  });

  return con;
}

module.exports = { createConnection };
