require("dotenv").config();

const env = {
  PORT: process.env.PORT || 5000,

  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME || "fc",

  //ngrok
  NGROK_AUTH_TOKEN: process.env.NGROK_AUTH_TOKEN,

  //enviroemmnt
  NODE_ENV: process.env.NODE_ENV || "development",
};

module.exports = env;
