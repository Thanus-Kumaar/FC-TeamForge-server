const { createConnection } = require("../config/sqlconnect");
const pool = createConnection();

const addPlayer = async (req, res) => {
  const { name, poscat, pos, playerId } = req.body;
  const userId = req.user?.id;

  if (!name || !poscat || !pos || !userId) {
    return res.status(400).json({ Error: "Missing required parameters" });
  }

  const insertPlayerQuery = `INSERT INTO Players (name, positionCategory, position) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id);`;
  const insertToUserPlayersQuery = `INSERT INTO user_players (user_id, player_id) VALUES (?, ?);`;

  let connection = null;

  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    // Insert into Players table
    const [playerResult] = await connection.query(insertPlayerQuery, [
      name,
      poscat,
      pos,
    ]);
    const playerIdToInsert = playerId || playerResult.insertId;

    // Insert into user_players table
    await connection.query(insertToUserPlayersQuery, [
      userId,
      playerIdToInsert,
    ]);

    await connection.commit();
    res
      .status(200)
      .json({
        message: "Player added successfully",
        playerId: playerIdToInsert,
      });
  } catch (err) {
    if (connection) await connection.rollback();
    console.error("Error in addPlayer:", err);
    res.status(500).json({ Error: "Database error" });
  } finally {
    if (connection) connection.release();
  }
};

const searchPlayer = async (req, res) => {
  let str = req.query.str;
  const present_p = req.query.present_players
    ? req.query.present_players.split(",")
    : [];

  if (!str) {
    return res.status(400).json({ message: "Enter String" });
  }
  str += "%";

  const query =
    present_p.length === 0
      ? "SELECT DISTINCT(name) FROM Players WHERE name LIKE ?;"
      : "SELECT DISTINCT(name) FROM Players WHERE name LIKE ? AND name NOT IN (?);";

  let connection = null;

  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(query, [str, present_p]);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in searchPlayer:", error);
    res.status(400).json({ Error: "Mysql server error" });
  } finally {
    if (connection) connection.release();
  }
};

const getPlayersByCategory = async (req, res) => {
  const { cat, present_players } = req.query;
  const present_p = present_players ? [present_players] : [];

  const query =
    !present_players || present_players.length === 0
      ? "SELECT name FROM Players WHERE positionCategory = ?;"
      : "SELECT name FROM Players WHERE positionCategory = ? AND name NOT IN (?);";

  let connection = null;

  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(query, [cat, present_p]);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in getPlayersByCategory:", error);
    res.status(400).json({ Error: "Mysql server error" });
  } finally {
    if (connection) connection.release();
  }
};

const getMyPlayers = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ Error: "User ID is required" });
  }

  const query = `
    SELECT p.name, p.position, p.positionCategory 
    FROM Players p
    INNER JOIN user_players up ON up.player_id = p.id
    WHERE up.user_id = ?;
  `;

  let connection = null;

  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(query, [userId]);
    res.status(200).json({ players: result });
  } catch (error) {
    console.error("Error in getMyPlayers:", error);
    res.status(400).json({ Error: "Mysql server error" });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  addPlayer,
  searchPlayer,
  getPlayersByCategory,
  getMyPlayers,
};
