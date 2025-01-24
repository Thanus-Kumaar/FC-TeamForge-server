const { formTeams } = require("../services/Algorithm");
const { createConnection } = require("../config/sqlconnect");
const pool = createConnection();

const createTeams = async (req, res) => {
  const { players, formation } = req.body;
  let connection = null;

  try {
    connection = await pool.getConnection();

    const teams = await formTeams(players, formation);

    if (teams[0] && teams[1]) {
      res.status(200).json({ Team: teams });
    } else {
      res.status(500).json({ Error: "Internal server error!" });
    }
  } catch (error) {
    console.error("Error in createTeams:", error);
    res.status(500).json({ Error: "Team Formation Failed" });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { createTeams };
