import { dbconfig } from "../database.js";
import { Router } from "express";

const artistsRouter = Router();

// Gets a list of all artists in db, format: {id, name, career_start}
artistsRouter.get("/", async (request, response) => {
  const query = "SELECT id, name, career_start FROM artists;";
  const [results] = await dbconfig.execute(query);
  response.json(results);

  // const query = /*sql*/ `
  //     SELECT artists.*,
  //             artists.name AS artistName,
  //             artists.id AS artistId
  //     FROM tracks
  //     INNER JOIN tracks_artists ON tracks.id = tracks_artists.track_id
  //     INNER JOIN artists ON tracks_artists.artist_id = artists.id;
  // `;
});

// Gets a specific artist by their id property
artistsRouter.get("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const query = "SELECT * FROM artists WHERE id=?;";
  const values = [id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Creates an artist, format: {name:string, career_start: int}
artistsRouter.post("/", async (request, response) => {
  const artist = request.body;
  const query = "INSERT INTO artists (name, career_start) VALUES (?, ?);";
  const values = [artist.name, artist.career_start];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Updates an artists, format: {name: string, career_start: int}
artistsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const artist = request.body;
  const query = "UPDATE artists SET name=?, career_start=? WHERE id=?;";
  const values = [artist.name, artist.career_start, id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Deletes an artist with the specific ID
artistsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM artists WHERE id=?;";
  const values = [id];
  const [results] = await dbconfig.execute(query, values, fields);
  response.json(results);
});

export default artistsRouter;
