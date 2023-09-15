import mysql from "mysql2";
import "dotenv/config";

const connection = mysql.createConnection({
  host: process.config.env.MYSQL_HOST,
  port: process.config.env.MYSQL_PORT,
  user: process.config.env.MYSQL_USER,
  database: process.config.env.MYSQL_DATABASE,
  password: process.config.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

export { connection };
