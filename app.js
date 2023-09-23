import express from "express";
import cors from "cors";
import artistsRouter from "./routes/artists.js";
import albumsRouter from "./routes/albums.js";
import tracksRouter from "./routes/tracks.js";
import fullAlbumRouter from "./routes/fullAlbum.js";
import mysql from "mysql2/promise";
import "dotenv/config";
import fs from "fs";

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());
// ROUTERS

app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/fullAlbums", fullAlbumRouter);

app.get("/", (request, response) => {
  response.send("test");
});

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});
const dbconnect = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_PASSWORD,
};

if (process.env.MYSQL_CERT) {
  dbconnect.ssl = { cs: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") };
}

const dbconfig = await mysql.createConnection(dbconnect);

export { dbconfig };
