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

/* Creates a new track with the inserted values 
  and inserts them into the 2 junction tables with associated album and artist, format: {title:string, duration:int, album_id:int, artist_id:int}*/
tracksRouter.post("/", async (request, response) => {
  const tracks = request.body;

  const tracksQuery = "INSERT INTO tracks (title, duration) VALUES (?, ?);";
  const tracksValues = [tracks.title, tracks.duration];
  const [tracksResults] = await dbconfig.execute(tracksQuery, tracksValues);

  const tracks_artistsQuery = /*SQL*/ `
  INSERT INTO tracks_artists (track_id, artist_id)
  VALUES (?, ?);`;
  const tracks_artistsValues = [tracksResults.insertId, tracks.artist_id];
  const [tracks_artistsResult] = await dbconfig.execute(tracks_artistsQuery, tracks_artistsValues);

  const tracks_albumsQuery = /*SQL*/ `
  INSERT INTO tracks_albums (track_id, album_id)
  VALUES (?, ?);`;
  const tracks_albumsValues = [tracksResults.insertId, tracks.album_id];
  const [tracks_albumsResult] = await dbconfig.execute(tracks_albumsQuery, tracks_albumsValues);

  const query = /*SQL*/ `
 SELECT tracks.title as trackTitle, albums.title as albumTitle, artists.name as artistTitle
FROM tracks
INNER JOIN tracks_albums ON tracks.id = tracks_albums.track_id
INNER JOIN albums ON tracks_albums.album_id = albums.id
INNER JOIN tracks_artists ON tracks.id = tracks_artists.track_id
INNER JOIN artists ON tracks_artists.artist_id = artists.id
WHERE tracks.id = ?;`;
  const values = [tracksResults.insertId];
  const [result] = await dbconfig.execute(query, values);

  response.json(result);
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
