const { createConnection } = require("../config/sqlconnect");
const pool = createConnection();

const getFormations = async (req, res) => {
  const player_n = req.query.no_p;
  const query = "SELECT formation FROM formations WHERE no_of_players = ?;";

  let connection = null;

  try {
    connection = await pool.getConnection();
    const [result] = await connection.query(query, [Math.floor(player_n / 2)]);
    const formations = result.map((item) => item.formation);
    res.status(200).json(formations);
  } catch (error) {
    console.error("Error in getFormations:", error);
    res.status(500).json({ Error: "The database has an error." });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getFormations };
