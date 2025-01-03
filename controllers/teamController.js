const { formTeams } = require("../services/Algorithm");

const createTeams = async (req, res) => {
  const { players, formation } = req.body;
  // using try catch block for handle errrror
  try {
    const t = await formTeams(players, formation);
    if (t[0] && t[1]) {
      res.status(200).json({ Team: t });
    } else {
      res.status(500).json({ Error: "Internal server error!" });
    }
  } catch (error) {
    res.status(500).json({ Error: "Team Formation Failed" });
  }
};

module.exports = { createTeams };
