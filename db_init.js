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

    // Create Players Table
    await connection.query(`create table if not exists players(name VARCHAR(255) Primary Key,position Varchar(100),positioncategory Varchar(100));`);

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
