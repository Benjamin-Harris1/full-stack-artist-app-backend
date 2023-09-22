import { Router, request } from "express";
import { dbconfig } from "../database.js";

const fullAlbumRouter = Router();

/*  inserts an artist, an album and a track and associates them in junction tables
     Format: {album_title:string, album_release_date:string, artist_name:string, artist_career_start:string, track_title:string, track_duration:int}
    Planned*/
fullAlbumRouter.post("/", async (request, response) => {
  const body = request.body;

  const albumQuery = /*SQL*/ `
  INSERT INTO albums (title, release_date)
  VALUES (?, ?);`;
  const albumValues = [body.album_title, body.release_date];
  const [albumResult] = await dbconfig.execute(albumQuery, albumValues);

  const artistQuery = "INSERT INTO artists (name, career_start) VALUES (?, ?);";
  const artistValues = [body.artist_name, body.artist_career_start];
  const [artistResult] = await dbconfig.execute(artistQuery, artistValues);

  const tracksQuery = "INSERT INTO tracks (title, duration) VALUES (?, ?);";
  const tracksValues = [body.track_title, body.track_duration];
  const [tracksResult] = await dbconfig.execute(tracksQuery, tracksValues);

  const albums_artistsQuery = /*SQL*/ `
  INSERT INTO albums_artists (album_id, artist_id)
  VALUES (?, ?);`;
  const albums_artistsValues = [albumResult.insertId, artistResult.insertId];
  const [albums_artistsResult] = await dbconfig.execute(albums_artistsQuery, albums_artistsValues);

  const tracks_albumsQuery = /*SQL*/ `
  INSERT INTO tracks_albums (track_id, album_id)
  VALUES (?, ?);`;
  const tracks_albumsValues = [tracksResult.insertId, albumResult.insertId];
  const [tracks_albumsResult] = await dbconfig.execute(tracks_albumsQuery, tracks_albumsValues);

  const tracks_artistsQuery = /*SQL*/ `
  INSERT INTO tracks_artists (track_id, artist_id)
  VALUES (?, ?);`;
  const tracks_artistsValues = [tracksResult.insertId, artistResult.insertId];
  const [tracks_artistsResult] = await dbconfig.execute(tracks_artistsQuery, tracks_artistsValues);
  const query = /*SQL*/ `
 SELECT tracks.title as trackTitle, albums.title as albumTitle, artists.name as artistTitle
  FROM tracks
  INNER JOIN tracks_albums ON tracks.id = tracks_albums.track_id
  INNER JOIN albums ON tracks_albums.album_id = albums.id
  INNER JOIN tracks_artists ON tracks.id = tracks_artists.track_id
  INNER JOIN artists ON tracks_artists.artist_id = artists.id
  WHERE tracks.id = ?;`;
  const values = [tracksResult.insertId];
  const [result] = await dbconfig.execute(query, values);

  response.json(result[0]);
});

fullAlbumRouter.get("/search", (request, response) => {
  const query = request.query.q.toLowerCase();
  const queryString = /*sql*/ `
    SELECT * FROM artists WHERE name LIKE ?
    UNION
    SELECT * FROM albums WHERE title LIKE ?
    UNION
    SELECT * FROM tracks WHERE title LIKE ?;`;
  const values = [`%${query}%`, `%${query}%`, `%${query}%`];
  dbConnection.query(queryString, values, (error, results) => {
    if (error) {
      console.log(error);
      response.status(500).json({ error: "Internal server error" });

    } else {
      response.json(results);
    }
  });
});

export default fullAlbumRouter;
