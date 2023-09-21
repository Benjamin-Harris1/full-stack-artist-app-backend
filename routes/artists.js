import { dbconfig } from "../database.js";
import { Router } from "express";

const artistsRouter = Router();

// gets a list of all artists in db, as {id, name, career_start}
artistsRouter.get("/", async (request, response) => {
  console.log("doing an artist");

  const query = /*sql*/ `
    SELECT id, name, career_start FROM artists
  `;
  // const query = /*sql*/ `
  //     SELECT artists.*,
  //             artists.name AS artistName,
  //             artists.id AS artistId
  //     FROM tracks
  //     INNER JOIN tracks_artists ON tracks.id = tracks_artists.track_id
  //     INNER JOIN artists ON tracks_artists.artist_id = artists.id;
  // `;
  const [results] = await dbconfig.execute(query);

  response.json(results);
});

// gets a specific artist by their id property
artistsRouter.get("/:id", async (request, response) => {
  const id = Number(request.params.id);
  const query = /*sql*/ `
  SELECT * FROM artists WHERE id=?;
  `;
  const values = [id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// posts an artist, format: {name:string, career_start:int}
artistsRouter.post("/", async (request, response) => {
  const artist = request.body;
  const query = /*sql*/ `
  INSERT INTO artists (name, career_start)
  VALUES (?, ?);
  `;
  const values = [artist.name, artist.career_start];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

artistsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const artist = request.body;
  const query = /*sql*/ `
  UPDATE artists SET name=?, career_start=? WHERE id=?
  `;
  const values = [artist.name, artist.career_start, id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

artistsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const query = /*sql*/ `
  DELETE FROM artists WHERE id=?;
  `;
  const values = [id];
  const [results] = await dbconfig.execute(query, values, fields);
  response.json(results);
});

export default artistsRouter;
