import { dbconfig } from "../database.js";
import { Router } from "express";

const artistsRouter = Router();

// Gets a list of all artists in db, format: {id, name, career_start}
artistsRouter.get("/", async (request, response) => {
  // Your SQL query to retrieve artists and albums
  const sql = `
    SELECT
    artists.id,
    artists.name as artist_name,
    artists.career_start,
    artists.img,
    albums.id as album_id
    FROM
      artists
    JOIN
      albums_artists ON artists.id = albums_artists.artist_id
    JOIN
      albums ON albums_artists.album_id = albums.id;
  `;

  // Execute the SQL query
  const [results] = await dbconfig.execute(sql);

  // Create a list to store the data
  const artistAlbums = [];

  // Loop through the SQL query results
  results.forEach(row => {
    const artistId = row.id;
    const artistName = row.artist_name;
    const artistCareerStart = row.career_start;
    const artistImg = row.img;
    const albumId = row.album_id;

    const result = artistAlbums.find(obj => {
      return obj.id == artistId;
    });
    // check if artistAlbums includes artistID, if so, add the abum_id to albums
    if (result) {
      artistAlbums.find(a => a.id == artistId).albums.push(albumId);
      // console.log(artistAlbums.find(a => a.id == artistId));
    } else {
      const artistObj = {
        id: artistId,
        name: artistName,
        career_start: artistCareerStart,
        img: artistImg,
        albums: [albumId],
      };
      artistAlbums.push(artistObj);
    }
  });

  // Close the database connection
  response.json(artistAlbums);
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
  const query = "INSERT INTO artists (name, career_start, img) VALUES (?, ?, ?);";
  const values = [artist.name, artist.career_start, artist.img];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Updates an artists, format: {name: string, career_start: int}
artistsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const artist = request.body;
  const query = "UPDATE artists SET name=?, career_start=?, img=? WHERE id=?;";
  const values = [artist.name, artist.career_start, artist.img, id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

// Deletes an artist with the specific ID
artistsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const values = [id];

  const deleteAssociationQuery = /*SQL*/ `
  DELETE FROM albums_artists WHERE artist_id = ?;
  Delete From tracks_artists WHERE artistid = ?`;
  await dbconfig.execute(deleteAssociationQuery, values);

  const query = "DELETE FROM artists WHERE id=?;";
  const [results] = await dbconfig.execute(query, values, fields);
  response.json(results);
});

export default artistsRouter;
