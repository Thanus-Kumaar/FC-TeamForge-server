const { createConnection } = require("../config/sqlconnect");
const con = createConnection();

/*
  formTeams(players, formation) is a function that assigns each player to one of two teams.
  The position assignment is based on their position category and the formation.

  The position categories are: Goalkeeper, Defender, Midfielder, Attacker
    
  Players that can’t be placed immediately into the correct position are added to a remaining_players set.
  They are then assigned to fill empty positions in a later pass through.

  In total there are 3 passes for assignment of positions:
    Pass 1 - Assign players to their exact position in their category.
    Pass 2 - Assign players to any position in their category.
    Pass 3 - Assign players to any open position.
*/

async function formTeams(players, formation) {
  let teams = { 0: {}, 1: {} }; // Object to store both the teams.
  let remaining_players = new Set(); // Set to store players who aren't assigned a position.

  // Allowed positions for defenders, midfielders, and attackers based on the formation.
  // For each category, the keys are the number of players, and the values are arrays of positions.
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

  // Querying database to get player details.
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

  // First Pass: Try to assign players to their specific poistions in one of the teams.
  for (let j of result) {
    // If player category is Goalkeeper then an attempt to assign player as goalkeeper will be done.
    if (j.catgry == "Goalkeeper") {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1;  // Selecting a random team: 0 or 1
      
      // If selected team doesn't have a goalkeeper, then assign the player.
      if (!teams[selectedTeam].hasOwnProperty("GK")) {
        teams[selectedTeam]["GK"] = j.name;
        // Otherwise, check if the other team needs a goalkeeper. If yes, assign the player.
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty("GK")) {
        teams[Number(!selectedTeam)]["GK"] = j.name;
      } else {
        remaining_players.add(j)  // If both teams already have a Goalkeeper, we add the player to remaining_players.
      }

      // If player category is Defender then an attempt to assign player as defender will be done.
    } else if (j.catgry == "Defender") {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1
      
      // Check if the player's exact position is an allowed position as per formation.
      if (defender[formation[1]].includes(j.position)) {
        if (!teams[selectedTeam].hasOwnProperty(j.position)) {
          teams[selectedTeam][j.position] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position)) {
          teams[Number(!selectedTeam)][j.position] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        // If no exact match for position, we try for variations like CB + "1" -> CB1.
      } else if (defender[formation[1]].includes(j.position + "1")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "1")) {
          teams[selectedTeam][j.position + "1"] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position + "1")) {
          teams[Number(!selectedTeam)][j.position + "1"] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        
        // If no exact match for position, we try for variations like CB + "2" -> CB2.
      } else if (defender[formation[1]].includes(j.position + "2")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "2")) {
          teams[selectedTeam][j.position + "2"] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position + "2")) {
          teams[Number(!selectedTeam)][j.position + "2"] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        
      } else {
        // If the exact position is not found, then player is automatically added to remaining_players.
        remaining_players.add(j)
      }
      
      // If player category is Midfielder then an attempt to assign player as midfielder will be done.
    } else if (j.catgry == "Midfielder") {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1
      
      if (midfielder[formation[2]].includes(j.position)) {
        if (!teams[selectedTeam].hasOwnProperty(j.position)) {
          teams[selectedTeam][j.position] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position)) {
          teams[Number(!selectedTeam)][j.position] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        
        // If no exact matches, then try to check for variations.
      } else if (midfielder[formation[2]].includes(j.position + "1")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "1")) {
          teams[selectedTeam][j.position + "1"] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position + "1")) {
          teams[Number(!selectedTeam)][j.position + "1"] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        
      } else if (midfielder[formation[2]].includes(j.position + "2")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "2")) {
          teams[selectedTeam][j.position + "2"] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position + "2")) {
          teams[Number(!selectedTeam)][j.position + "2"] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        
      } else {
        // If the exact position is not found, then player is automatically added to remaining_players.
        remaining_players.add(j)
      }
      
      // If player category is attacker then an attempt to assign player as attacker will be done.
    } else if (j.catgry == "Attacker") {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1

      if (attacker[formation[3]].includes(j.position)) {
        if (!teams[selectedTeam].hasOwnProperty(j.position)) {
          teams[selectedTeam][j.position] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position)) {
          teams[Number(!selectedTeam)][j.position] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }
        
        // If no exact matches, then try to check for variations.
      } else if (attacker[formation[3]].includes(j.position + "1")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "1")) {
          teams[selectedTeam][j.position + "1"] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position + "1")) {
          teams[Number(!selectedTeam)][j.position + "1"] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }

      } else if (attacker[formation[3]].includes(j.position + "2")) {
        if (!teams[selectedTeam].hasOwnProperty(j.position + "2")) {
          teams[selectedTeam][j.position + "2"] = j.name;
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j.position + "2")) {
          teams[Number(!selectedTeam)][j.position + "2"] = j.name;
        } else {
          // If the position is found but already assigned, player is added to remaining_players.
          remaining_players.add(j)
        }

      } else {
        // If the exact position is not found, then player is automatically added to remaining_players.
        remaining_players.add(j)
      }
    }
  }
  // Second Pass: Assign remaining players (exact position wasn't available) to any open position in their category.
  for (let i of [...remaining_players]) {
    let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1
    if (i.catgry == "Goalkeeper") {
       // If a team is missing a goalkeeper, assign the player there.
      if (!teams[selectedTeam].hasOwnProperty("GK")) {
        teams[selectedTeam]["GK"] = i.name;
        remaining_players.delete(i);
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty("GK")) {
        teams[Number(!selectedTeam)]["GK"] = i.name;
        remaining_players.delete(i);
      }

    } else if (i.catgry == "Defender") {
      // Try to place the defender in any available defender position.
      for (let j of defender[formation[1]]) {
        if (!teams[selectedTeam].hasOwnProperty(j)) {
          teams[selectedTeam][j] = i.name;
          remaining_players.delete(i);
          break; // Stop once the player is assigned.
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
          teams[Number(!selectedTeam)][j] = i.name;
          remaining_players.delete(i);
          break;
        }
      }

      // Try to place the midfielder in any available midfielder position.
    } else if (i.catgry == "Midfielder") {
      for (let j of midfielder[formation[2]]) {
        if (!teams[selectedTeam].hasOwnProperty(j)) {
          teams[selectedTeam][j] = i.name;
          remaining_players.delete(i);
          break; // Stop once the player is assigned.
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
          teams[Number(!selectedTeam)][j] = i.name;
          remaining_players.delete(i);
          break;
        }
      }

      // Try to place the attacker in any available attacker position.
    } else if (i.catgry == "Attacker") {
      for (let j of attacker[formation[3]]) {
        if (!teams[selectedTeam].hasOwnProperty(j)) {
          teams[selectedTeam][j] = i.name;
          remaining_players.delete(i);
          break; // Stop once the player is assigned.
        } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
          teams[Number(!selectedTeam)][j] = i.name;
          remaining_players.delete(i);
          break;
        }
      }
    }
  }

  console.log("TEAM BEFORE: ", teams, "remain: ", remaining_players);

  // Third Pass: Fill in any missing positions using the remaining players.
  for (let c = 0; c < 2; c++) {
    if (remaining_players.size > 0) {

      // Ensure that each team has a goalkeeper.
      if (!teams[0].hasOwnProperty("GK")) {
        const p = remaining_players.values().next().value;
        if (p) {
          teams[0]["GK"] = p.name;
          remaining_players.delete(p);
        }
      } else if (!teams[1].hasOwnProperty("GK")) {
        const p = remaining_players.values().next().value;
        if (p) {
          teams[1]["GK"] = p.name;
          remaining_players.delete(p);
        }
      }
    }

    if (remaining_players.size == 0) break; // Stop if all remaining players were assigned.

    // Fill in any open defender positions.
    for (let j of defender[formation[1]]) {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1
      if (!teams[selectedTeam].hasOwnProperty(j)) {
        const p = remaining_players.values().next().value;
        if (p) {
          teams[selectedTeam][j] = p.name;
          remaining_players.delete(p);
        }
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
        const p = remaining_players.values().next().value;
        if (p) {
          teams[Number(!selectedTeam)][j] = p.name;
          remaining_players.delete(p);
        }
      }
    }

    // Fill in any open midfielder positions.
    for (let j of midfielder[formation[2]]) {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1
      if (!teams[selectedTeam].hasOwnProperty(j)) {
        const p = remaining_players.values().next().value;
        if (p) {
          teams[selectedTeam][j] = p.name;
          remaining_players.delete(p);
        }
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
        const p = remaining_players.values().next().value;
        if (p) {
          teams[Number(!selectedTeam)][j] = p.name;
          remaining_players.delete(p);
        }
      }
    }

    // Fill in any open attacker positions.
    for (let j of attacker[formation[3]]) {
      let selectedTeam = Math.random() < 0.5 ? 0 : 1; // Selecting a random team: 0 or 1
      if (!teams[selectedTeam].hasOwnProperty(j)) {
        const p = remaining_players.values().next().value;
        if (p) {
          console.log("P:", p);
          teams[selectedTeam][j] = p.name;
          remaining_players.delete(p);
        }
      } else if (!teams[Number(!selectedTeam)].hasOwnProperty(j)) {
        const p = remaining_players.values().next().value;
        if (p) {
          console.log("P:", p);
          teams[Number(!selectedTeam)][j] = p.name;
          remaining_players.delete(p);
        }
      }
    }
  }

  console.log("Remaining: ", remaining_players);
  console.log(teams);

  return teams; // Return the fully formed teams.
}

module.exports = { formTeams };
