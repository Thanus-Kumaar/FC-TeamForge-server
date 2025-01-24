const { createConnection } = require("../config/sqlconnect");
const pool = createConnection();

const userModule = {
  createUser: async (username, email, password, res) => {
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    let connection = null;

    try {
      connection = await pool.getConnection(); 
      await connection.query(query, [username, email, password]);
      res.status(201).json({ Status: "User created successfully" });
    } catch (err) {
      console.error("Error in createUser:", err);
      res.status(500).json({ Error: "Database error or user already exists" });
    } finally {
      if (connection) connection.release(); 
    }
  },

  findUserByEmail: async (email, res, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    let connection = null;

    try {
      connection = await pool.getConnection();
      const [results] = await connection.query(query, [email]);
      if (results.length === 0) {
        return res.status(404).json({ Error: "User not found" });
      }
      callback(results[0]);
    } catch (err) {
      console.error("Error in findUserByEmail:", err);
      res.status(500).json({ Error: "Database error" });
    } finally {
      if (connection) connection.release();
    }
  },
};

module.exports = { userModule };
