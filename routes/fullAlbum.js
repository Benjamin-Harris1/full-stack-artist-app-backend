import { Router, request } from "express";
import { dbconfig } from "../database.js";

const fullAlbumRouter = Router();

/*  inserts an artist, an album and several tracks and associates them in junction tables
      format:{album_title:string, album_release_date:string, artist_name:string, artist_career_start:string, img:string tracks_title:[string], tracks_duration:[time]}*/
fullAlbumRouter.post("/", async (request, response) => {
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
  for (let i in body.tracks_title) {
    console.log(`attempting to create track ${i} with ${body.tracks_title[i]} and ${body.tracks_duration[i]}`);

    const tracksQuery = "INSERT INTO tracks (title, duration) VALUES (?, ?);";
    const tracksValues = [body.tracks_title[i], body.tracks_duration[i]];
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



  const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'your_mysql_host',
  user: 'your_mysql_user',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
  
  // Your SQL query to retrieve artists and albums
  const sql = `
    SELECT
        artists.artist_name,
        albums.album_id
    FROM
        artists
    JOIN
        artists_albums ON artists.artist_id = artists_albums.artist_id
    JOIN
        albums ON artists_albums.album_id = albums.album_id;
  `;
  
  // Execute the SQL query
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      connection.end(); // Close the database connection in case of an error
      return;
    }
    
    // Create an object to store the data
    const artistAlbums = {};
    
    // Loop through the SQL query results
    results.forEach((row) => {
      const artistName = row.artist_name;
      const albumId = row.album_id;
      
      // Check if the artist is already in the object, if not, create an empty array
      if (!artistAlbums[artistName]) {
        artistAlbums[artistName] = [];
      }
      
      // Push the album ID into the artist's array
      artistAlbums[artistName].push(albumId);
    });
    
    // Now, artistAlbums is an object where each artist has a list of album IDs
    console.log(artistAlbums);
    
    // Close the database connection
    connection.end();
  });
});

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
