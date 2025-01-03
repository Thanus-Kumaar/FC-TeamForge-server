const { query } = require("express");
const { createConnection } = require("../config/sqlconnect");
const con = createConnection();

const addPlayer = async (req, res) => {
  const { name, poscat, pos } = req.body;

  if (!name || !poscat || !pos) {
    return res.status(400).json({ Error: "Wrong or No parameters passed" });
  }
  const q =
    "INSERT INTO Players(name,positionCategory,position) values(?,?,?);";

  con.query(q, [name, poscat, pos], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(402).json({ Error: "Player Already Exist" });
    }
    res.status(200).json({ Status: "Insertion Successful" });
  });
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
  let q;
  let queryParams;

  if (present_p.length == 0) {
    q = "SELECT distinct(name) FROM Players WHERE name like ?;";
    queryParams = [str];
  } else {
    q =
      "SELECT distinct(name) FROM Players WHERE name like ? AND name NOT IN ?;";
    queryParams = [str, present_p];
  }

  con.query(q, queryParams, (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ Error: "Mysql server error" });
    }
    res.status(200).json(result);
  });
};

const getPlayersByCategory = async (req, res) => {
  const { cat, present_players } = req.query;
  const present_p = [present_players];
  let q;
  let queryParams;

  if (!present_players || present_players.length == 0) {
    q = "SELECT name FROM players WHERE positioncategory = ?;";
    queryParams = [cat];
  } else {
    q =
      "SELECT name FROM players WHERE positioncategory = ? AND name NOT IN ?;";
    queryParams = [cat, present_p];
  }

  con.query(q, queryParams, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(400).json(error);
    } else {
      res.status(200).json(result);
    }
  });
};

const getMyPlayers = async (req, res) => {
  const name = req.body.map((item) => item.name);
  const q =
    "SELECT distinct(name), position, positioncategory FROM Players where name in ?";

  con.query(q, [name], (error, result) => {
    if (error) {
      console.log(error);
      return res.status(400).json({ Error: "Mysql server error" });
    }
    res.status(200).json(result);
  });
};
module.exports = {
  addPlayer,
  searchPlayer,
  getPlayersByCategory,
  getMyPlayers,
};
