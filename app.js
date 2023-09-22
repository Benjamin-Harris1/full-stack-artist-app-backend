import express from "express";
import cors from "cors";
import artistsRouter from "./routes/artists.js";
import albumsRouter from "./routes/albums.js";
import tracksRouter from "./routes/tracks.js";
import fullAlbumRouter from "./routes/fullalbum.js";

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
