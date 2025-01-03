const { createConnection } = require("../config/sqlconnect");
const con = createConnection();

const getFormations = async (req, res) => {
  const player_n = req.query.no_p;
  const q = "SELECT formation FROM formations WHERE no_of_players=?;";

  con.query(q, [Math.floor(player_n / 2)], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ Error: "The databse has an errorr.." }); //printing errorr inthe databse
    }
    const formations = result.map((item) => item.formation);
    res.status(200).json(formations);
  });
};

module.exports = { getFormations };
