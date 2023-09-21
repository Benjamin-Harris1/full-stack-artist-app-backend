import { dbconfig } from "../database.js";
import { Router } from "express";

const tracksRouter = Router();

// Gets a list of all tracks in db, format: {id, title, duration}
tracksRouter.get("/", async (request, response) => {
  const query = "SELECT * FROM tracks ORDER BY title;";
  const [results] = await dbconfig.execute(query);
  response.json(results);
});

// Gets a specific track by its ID property, format: {id, title, duration}
tracksRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const values = [id];
  const query = "SELECT * FROM tracks WHERE id=?";
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Creates a new track with the inserted values, format: {id, title, duration}
tracksRouter.post("/", async (request, response) => {
  const tracks = request.body;
  const query = "INSERT INTO tracks (title, duration) VALUES (?, ?);";
  const values = [tracks.title, tracks.duration];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Updates a track, format: {id, title, duration}
tracksRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const track = request.body;
  const query = "UPDATE tracks SET title=?, duration=? WHERE id=?;";
  const values = [track.title, track.duration, id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Deletes a track with the specific ID
tracksRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM tracks WHERE id=?;";
  const values = [id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

export default tracksRouter;
