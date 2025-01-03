// sqlconnect.js
const sql = require("mysql2");
const env=require('./env')

function createConnection() {
  const con = sql.createConnection({
    host:env.DB_HOST,
    user:env.DB_USER,
    password:env.DB_PASS,
    database:env.DB_NAME
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
