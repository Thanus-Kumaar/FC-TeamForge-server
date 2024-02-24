const { createConnection } = require("./sqlconnect");
const con = createConnection();

async function formTeams(players, formation) {
  teams = { 0: {}, 1: {} };
  remaining_players = [];

  const defender = {
    2: ["CB1", "CB2"],
    3: ["LB", "CB", "RB"],
    4: ["LB", "CB1", "CB2", "RB"],
  };
  const midfielder = {
    1: ["CM"],
    2: ["CM1", "CM2"],
    3: ["LM", "CM", "RM"],
    4: ["CAM", "CM1", "CM2", "CDM"],
  };
  const attacker = {
    1: ["ST"],
    2: ["ST1", "ST2"],
    3: ["LW", "ST", "RW"],
    4: ["LW", "ST1", "ST2", "RW"],
  };
  const result = await new Promise((resolve, reject) => {
    con.query(
      "SELECT name, position, positioncategory as catgry FROM players WHERE name in ?",
      [[players]],
      (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      }
    );
  });
  for (let j of result) {
    if (j.catgry == "Goalkeeper") {
      //select a random number 1 or 2
      let selectedTeam;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;

      if (!teams[selectedTeam].hasOwnProperty("GK")) {
        teams[selectedTeam]["GK"] = j.name;
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty("GK")) {
        teams[Number(!selectedTeam)]["GK"] = j.name;
      } else {
        remaining_players.push(j);
      }
    } else if (j.catgry == "Defender") {
      //select a random number 1 or 2
      let selectedTeam;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;

      if (defender[formation[1]].includes(j.position)) {
        if (!teams[selectedTeam].hasOwnProperty(j.position)) {
          teams[selectedTeam][j.position] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position)) {
          teams[Number(!selectedTeam)][j.position] = j.name;
        } else {
          //position found but full
          remaining_players.push(j);
        }
      } else if (defender[formation[1]].includes(j.position + "1")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "1")) {
          teams[selectedTeam][j.position + "1"] = j.name;
        } else if (
          !teams[Number(!selectedTeam)].hasOwnProperty(j.position + "1")
        ) {
          teams[Number(!selectedTeam)][j.position + "1"] = j.name;
        } else {
          //position found but full
          remaining_players.push(j);
        }
      } else if (defender[formation[1]].includes(j.position + "2")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "2")) {
          teams[selectedTeam][j.position + "2"] = j.name;
        } else if (
          !teams[Number(!selectedTeam)].hasOwnProperty(j.position + "2")
        ) {
          teams[Number(!selectedTeam)][j.position + "2"] = j.name;
        } else {
          //position found but full
          remaining_players.push(j);
        }
      } else {
        // position not found
        remaining_players.push(j);
      }
    } else if (j.catgry == "Midfielder") {
      //select a random number 1 or 2
      let selectedTeam;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;

      if (midfielder[formation[2]].includes(j.position)) {
        if (!teams[selectedTeam].hasOwnProperty(j.position)) {
          teams[selectedTeam][j.position] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position)) {
          teams[Number(!selectedTeam)][j.position] = j.name;
        } else {
          // position found but full
          remaining_players.push(j);
        }
      } else if (midfielder[formation[2]].includes(j.position + "1")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "1")) {
          teams[selectedTeam][j.position + "1"] = j.name;
        } else if (
          !teams[Number(!selectedTeam)].hasOwnProperty(j.position + "1")
        ) {
          teams[Number(!selectedTeam)][j.position + "1"] = j.name;
        } else {
          // position found but full
          remaining_players.push(j);
        }
      } else if (midfielder[formation[2]].includes(j.position + "2")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "2")) {
          teams[selectedTeam][j.position + "2"] = j.name;
        } else if (
          !teams[Number(!selectedTeam)].hasOwnProperty(j.position + "2")
        ) {
          teams[Number(!selectedTeam)][j.position + "2"] = j.name;
        } else {
          // position found but full
          remaining_players.push(j);
        }
      } else {
        // position not found
        remaining_players.push(j);
      }
    } else if (j.catgry == "Attacker") {
      //select a random number 1 or 2
      let selectedTeam;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;

      if (attacker[formation[3]].includes(j.position)) {
        if (!teams[selectedTeam].hasOwnProperty(j.position)) {
          teams[selectedTeam][j.position] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position)) {
          teams[Number(!selectedTeam)][j.position] = j.name;
        } else {
          // position found but full
          remaining_players.push(j);
        }
      } else if (attacker[formation[3]].includes(j.position + "1")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "1")) {
          teams[selectedTeam][j.position + "1"] = j.name;
        } else if (
          !teams[Number(!selectedTeam)].hasOwnProperty(j.position + "1")
        ) {
          teams[Number(!selectedTeam)][j.position + "1"] = j.name;
        } else {
          // position found but full
          remaining_players.push(j);
        }
      } else if (attacker[formation[3]].includes(j.position + "2")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "2")) {
          teams[selectedTeam][j.position + "2"] = j.name;
        } else if (
          !teams[Number(!selectedTeam)].hasOwnProperty(j.position + "2")
        ) {
          teams[Number(!selectedTeam)][j.position + "2"] = j.name;
        } else {
          // position found but full
          remaining_players.push(j);
        }
      } else {
        // position not found
        remaining_players.push(j);
      }
    }
  }
  for (let i of remaining_players) {
    let selectedTeam;
    var randomNumber = Math.random();
    if (randomNumber < 0.5) selectedTeam = 0;
    else selectedTeam = 1;
    if (i.catgry == "Goalkeeper") {
      if (!teams[selectedTeam].hasOwnProperty("GK")) {
        teams[selectedTeam]["GK"] = i.name;
        remaining_players = remaining_players.filter(
          (player) => player.name != i.name
        );
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty("GK")) {
        teams[Number(!selectedTeam)]["GK"] = i.name;
        remaining_players = remaining_players.filter(
          (player) => player.name != i.name
        );
      }
    } else if (i.catgry == "Defender") {
      for (let j of defender[formation[1]]) {
        if (!teams[selectedTeam].hasOwnProperty(j)) {
          teams[selectedTeam][j] = i.name;
          remaining_players = remaining_players.filter(
            (player) => player.name != i.name
          );
          break;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
          teams[Number(!selectedTeam)][j] = i.name;
          remaining_players = remaining_players.filter(
            (player) => player.name != i.name
          );
          break;
        }
      }
    } else if (i.catgry == "Midfielder") {
      for (let j of midfielder[formation[2]]) {
        if (!teams[selectedTeam].hasOwnProperty(j)) {
          teams[selectedTeam][j] = i.name;
          remaining_players = remaining_players.filter(
            (player) => player.name != i.name
          );
          break;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
          teams[Number(!selectedTeam)][j] = i.name;
          remaining_players = remaining_players.filter(
            (player) => player.name != i.name
          );
          break;
        }
      }
    } else if (i.catgry == "Attacker") {
      for (let j of attacker[formation[3]]) {
        if (!teams[selectedTeam].hasOwnProperty(j)) {
          teams[selectedTeam][j] = i.name;
          remaining_players = remaining_players.filter(
            (player) => player.name != i.name
          );
          break;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
          teams[Number(!selectedTeam)][j] = i.name;
          remaining_players = remaining_players.filter(
            (player) => player.name != i.name
          );
          break;
        }
      }
    }
  }
  let selectedTeam;
  console.log("TEAM BEFORE: ", teams, "remain: ", remaining_players);
  for (let c = 0; c < 2; c++) {
    if (remaining_players.length != 0) {
      if (!teams[0].hasOwnProperty("GK")) {
        const p = remaining_players.shift();
        teams[0]["GK"] = p.name;
      } else if (!teams[1].hasOwnProperty("GK")) {
        const p = remaining_players.shift();
        teams[1]["GK"] = p.name;
      }
    }
    if (remaining_players.length == 0) break;
    for (let j of defender[formation[1]]) {
      if (remaining_players.length == 0) break;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;
      if (!teams[selectedTeam].hasOwnProperty(j)) {
        const p = remaining_players.shift();
        teams[selectedTeam][j] = p.name;
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
        const p = remaining_players.shift();
        teams[Number(!selectedTeam)][j] = p.name;
      }
    }
    for (let j of midfielder[formation[2]]) {
      if (remaining_players.length == 0) break;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;
      if (!teams[selectedTeam].hasOwnProperty(j)) {
        const p = remaining_players.shift();
        teams[selectedTeam][j] = p.name;
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
        const p = remaining_players.shift();
        teams[Number(!selectedTeam)][j] = p.name;
      }
    }
    for (let j of attacker[formation[3]]) {
      if (remaining_players.length == 0) break;
      var randomNumber = Math.random();
      if (randomNumber < 0.5) selectedTeam = 0;
      else selectedTeam = 1;
      if (!teams[selectedTeam].hasOwnProperty(j)) {
        const p = remaining_players.shift();
        console.log("P:", p);
        teams[selectedTeam][j] = p.name;
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
        const p = remaining_players.shift();
        console.log("P:", p);
        teams[Number(!selectedTeam)][j] = p.name;
      }
    }
  }
  console.log("Remaining: ", remaining_players);
  console.log(teams);
  return teams;
}

module.exports = { formTeams };
