import { Router, request } from "express";
import { dbconfig } from "../database.js";

const fullAlbumRouter = Router();

/*  inserts an artist, an album and several tracks and associates them in junction tables
      format:{album_title:string, album_release_date:string, artist_name:string, artist_career_start:string, img:string tracks_title:[string], tracks_duration:[time]}*/
fullAlbumRouter.post("/", async (request, response) => {
  console.log(`Attempting to post with ${body}`);
  const body = request.body;
  let trackID;

  const albumQuery = /*SQL*/ `
  INSERT INTO albums (title, release_date)
  VALUES (?, ?);`;
  const albumValues = [body.album_title, body.album_release_date];
  const [albumResult] = await dbconfig.execute(albumQuery, albumValues);

  const artistQuery = "INSERT INTO artists (name, career_start, img) VALUES (?, ?, ?);";
  const artistValues = [body.artist_name, body.artist_career_start, body.img];
  const [artistResult] = await dbconfig.execute(artistQuery, artistValues);

  const albums_artistsQuery = /*SQL*/ `
  INSERT INTO albums_artists (album_id, artist_id)
  VALUES (?, ?);`;
  const albums_artistsValues = [albumResult.insertId, artistResult.insertId];
  const [albums_artistsResult] = await dbconfig.execute(albums_artistsQuery, albums_artistsValues);
  for (const track of body.tracks) {
    console.log(`attempting to create track ${track} with ${track.title} and ${track.duration}`);

    const tracksQuery = "INSERT INTO tracks (title, duration) VALUES (?, ?);";
    const tracksValues = [track.title, track.duration];
    const [tracksResult] = await dbconfig.execute(tracksQuery, tracksValues);

    const tracks_artistsQuery = /*SQL*/ `
    INSERT INTO tracks_artists (track_id, artist_id)
    VALUES (?, ?);`;
    const tracks_artistsValues = [tracksResult.insertId, artistResult.insertId];
    const [tracks_artistsResult] = await dbconfig.execute(tracks_artistsQuery, tracks_artistsValues);

    const tracks_albumsQuery = /*SQL*/ `
    INSERT INTO tracks_albums (track_id, album_id)
    VALUES (?, ?);`;
    const tracks_albumsValues = [tracksResult.insertId, albumResult.insertId];
    const [tracks_albumsResult] = await dbconfig.execute(tracks_albumsQuery, tracks_albumsValues);
    trackID = tracksResult.insertId;
  }

  const query = /*SQL*/ `
 SELECT tracks.title as trackTitle, albums.title as albumTitle, artists.name as artistTitle
  FROM tracks
  INNER JOIN tracks_albums ON tracks.id = tracks_albums.track_id
  INNER JOIN albums ON tracks_albums.album_id = albums.id
  INNER JOIN tracks_artists ON tracks.id = tracks_artists.track_id
  INNER JOIN artists ON tracks_artists.artist_id = artists.id
  WHERE tracks.id = ?;`;
  const values = [trackID];
  const [result] = await dbconfig.execute(query, values);

  response.json(result);
});

fullAlbumRouter.get("/search", async (request, response) => {
  const query = request.query.q.toLowerCase();
  const queryString = /*sql*/ `

SELECT title, release_date, NULL AS name, NULL AS career_start, NULL AS duration
FROM albums WHERE title LIKE ?
UNION
SELECT NULL AS title, NULL AS release_date, name, career_start, NULL AS duration
FROM artists WHERE name LIKE ?
UNION
SELECT title, NULL AS release_date, NULL AS name, NULL AS career_start, duration
FROM tracks WHERE title LIKE ?;`;

  const values = [`%${query}%`, `%${query}%`, `%${query}%`];
  const [results] = await dbconfig.execute(queryString, values);
  response.json(results);
});

fullAlbumRouter.get("/:id", async (request, response) => {
  const id = request.params.id;

  const query = /*SQL*/ `
    SELECT
      albums.title AS album_title,
      albums.release_date AS album_release_date,
      artists.name AS artist_name,
      artists.career_start AS artist_career_start,
      tracks.title AS track_title,
      tracks.duration AS track_duration
    FROM albums
    INNER JOIN albums_artists ON albums.id = albums_artists.album_id
    INNER JOIN artists ON albums_artists.artist_id = artists.id
    INNER JOIN tracks_albums ON albums.id = tracks_albums.album_id
    INNER JOIN tracks ON tracks_albums.track_id = tracks.id
    WHERE albums.id = ?;`;

  const [results] = await dbconfig.execute(query, [id]);
  if (results.length === 0) {
    console.log("Album not found");
  } else {
    response.json(results);
  }
});

export default fullAlbumRouter;
