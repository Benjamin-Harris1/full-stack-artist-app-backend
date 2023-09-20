import mysql from "mysql2";
import "dotenv/config";
import fs from "fs";

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
  multipleStatements: true,
});

// const dbconfig = {
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   database: process.env.MYSQL_DATABASE,
//   password: process.env.MYSQL_PASSWORD,
// };

// if (process.env.MYSQL_CERT) {
//   dbconfig.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
// }

// const connection = mysql.createConnection(dbconfig);

export { connection };
