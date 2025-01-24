const mysql = require("mysql2/promise");
require("dotenv").config();

async function initializeDatabase() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASS,
  });

  try {
    console.log("Connected to MySQL. Initializing database...");

    // Create Database if not exists
    await connection.query("CREATE DATABASE IF NOT EXISTS fc");
    await connection.query("USE fc");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(100) NOT NULL UNIQUE,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `);
      
      await connection.query(`
      CREATE TABLE IF NOT EXISTS players (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          position VARCHAR(100),
          positioncategory VARCHAR(100)
      );
      `);
      
      await connection.query(`
      CREATE TABLE IF NOT EXISTS user_players (
          user_id INT NOT NULL,
          player_id INT NOT NULL,
          PRIMARY KEY (user_id, player_id),
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
      );
      `);
      

    // Create Formations Table
    await connection.query(`create table if not exists formations(formation varchar(100) Unique ,no_of_players int);`);

    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Error initializing database:", err);
  } finally {
    await connection.end();
  }
}

initializeDatabase();
