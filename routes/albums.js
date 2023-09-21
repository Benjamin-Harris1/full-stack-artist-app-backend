import { Router } from "express";
import { dbconfig } from "../database.js";

const albumsRouter = Router();

// SKAL LAVES TIL mysql/promises SYNTAX LIGESOM DER ER GJORT I ARTISTS.JS

albumsRouter.get("/", (request, response) => {
  const query = "SELECT * FROM albums ORDER BY title;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

albumsRouter.get("/:id", (request, response) => {
  const id = Number(request.params.id);
  const query = "SELECT * FROM albums WHERE id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results[0]);
    }
  });
});

// TÆNKER VI SKAL TILFØJE album.artist_id når vi har lavet vores krydstabeller
albumsRouter.post("/", (request, response) => {
  const album = request.body;
  const query = "INSERT INTO albums (title, release_date) VALUES (?, ?);";
  const values = [album.title, album.release_date];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

albumsRouter.put("/:id", (request, response) => {
  const id = request.params.id;
  const album = request.body;
  const query = "UPDATE albums SET title=?, release_date=? WHERE id=?;";
  const values = [album.title, album.release_date, id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

albumsRouter.delete("/:id", (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM albums WHERE id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

export default albumsRouter;
