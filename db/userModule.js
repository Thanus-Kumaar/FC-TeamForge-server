const { createConnection } = require("../config/sqlconnect");
const con = createConnection();

const userModule = {
  
  createUser: (username, email, password, res) => {
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    con.query(query, [username, email, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: "User already exists or database error" });
      }
      res.status(201).json({ Status: "User created successfully" });
    });
  },

  
  findUserByEmail: (email, res, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    con.query(query, [email], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: "Database error" });
      }
      if (results.length === 0) {
        return res.status(404).json({ Error: "User not found" });
      }
      callback(results[0]);
    });
  },
};

const playerModule = {
  
  addPlayerToUserId: (userId, playerId, res) => {
    const query = "INSERT INTO user_players (user_id, player_id) VALUES (?, ?)";
    con.query(query, [userId, playerId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: "Database error or player already assigned" });
      }
      res.status(201).json({ Status: "Player added to user successfully" });
    });
  },

  
  getPlayersForUserId: (userId, res) => {
    const query = "SELECT p.* FROM players p INNER JOIN user_players up ON p.id = up.player_id WHERE up.user_id = ?";
    con.query(query, [userId], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ Error: "Database error" });
      }
      res.status(200).json({ Status: "Players retrieved successfully", Players: results });
    });
  },
};

module.exports = { userModule, playerModule };
