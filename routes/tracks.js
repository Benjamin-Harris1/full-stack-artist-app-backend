import { dbconfig } from "../database.js";
import { Router } from "express";

const tracksRouter = Router();

// SKAL LAVES TIL mysql/promises SYNTAX LIGESOM DER ER GJORT I ARTISTS.JS

tracksRouter.get("/", async (request, response) => {
  const query = "SELECT * FROM tracks ORDER BY title;";
  const [results] = await dbconfig.execute(query);
  response.json(results);
});

tracksRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const values = [id];
  const query = "SELECT * FROM tracks WHERE id=?";
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

tracksRouter.post("/", async (request, response) => {
  const tracks = request.body;
  const query = "INSERT INTO tracks (title, duration) VALUES (?, ?); ";
  const values = [tracks.title, tracks.duration];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

tracksRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const track = request.body;
  const query = "UPDATE tracks SET title=?, duration=? WHERE id=?;";
  const values = [track.title, track.duration, id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

tracksRouter.delete("/:id", (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM tracks WHERE id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

export default tracksRouter;
