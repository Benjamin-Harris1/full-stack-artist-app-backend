import express from "express";
import cors from "cors";
import { dbconfig } from "./database.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("test");
});

// --------------------------------------- A R T I S T S --------------------------------------------//

app.get("/artists", async (request, response) => {
  const query = /*sql*/ `
            SELECT artists.*,
                    artists.name AS artistName,
                    artists.id AS artistId
            FROM tracks
            INNER JOIN tracks_artists ON tracks.id = tracks_artists.track_id
            INNER JOIN artists ON tracks_artists.artist_id = artists.id;
  `;
  const [results] = await dbconfig.execute(query);

  response.json(results);
});

app.get("/artists/:id", async (request, response) => {
  const id = Number(request.params.id);
  const query = /*sql*/ `
  SELECT * FROM artists WHERE id=?;
  `;
  const values = [id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

app.post("/artists", async (request, response) => {
  const artist = request.body;
  const query = /*sql*/ `
  INSERT INTO artists (name, career_start)
  VALUES (?, ?);
  `;
  const values = [artist.name, artist.career_start];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

app.put("/artists/:id", async (request, response) => {
  const id = request.params.id;
  const artist = request.body;
  const query = /*sql*/ `
  UPDATE artists SET name=?, career_start=? WHERE id=?
  `;
  const values = [artist.name, artist.career_start, id];
  const [results] = await dbconfig.execute(query, values);
  response.json(results);
});

app.delete("/artists/:id", async (request, response) => {
  const id = request.params.id;
  const query = /*sql*/ `
  DELETE FROM artists WHERE id=?;
  `;
  const values = [id];
  const [results] = await dbconfig.execute(query, values, fields);
  response.json(results);
});

// // --------------------------------------- A L B U M S --------------------------------------------//

// app.get("/albums", (request, response) => {
//   const query = "SELECT * FROM albums ORDER BY title;";
//   connection.query(query, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.get("/albums/:id", (request, response) => {
//   const id = Number(request.params.id);
//   const query = "SELECT * FROM albums WHERE id=?;";
//   const values = [id];

//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results[0]);
//     }
//   });
// });

// // TÆNKER VI SKAL TILFØJE album.artist_id når vi har lavet vores krydstabeller
// app.post("/albums", (request, response) => {
//   const album = request.body;
//   const query = "INSERT INTO albums (title, release_date) VALUES (?, ?);";
//   const values = [album.title, album.release_date];
//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.put("/albums/:id", (request, response) => {
//   const id = request.params.id;
//   const album = request.body;
//   const query = "UPDATE albums SET title=?, release_date=? WHERE id=?;";
//   const values = [album.title, album.release_date, id];

//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.delete("/albums/:id", (request, response) => {
//   const id = request.params.id;
//   const query = "DELETE FROM albums WHERE id=?;";
//   const values = [id];

//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// // --------------------------------------- T R A C K S --------------------------------------------//

// app.get("/tracks", (request, response) => {
//   const query = "SELECT * FROM tracks ORDER BY title;";
//   connection.query(query, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.get("/tracks/:id", (request, response) => {
//   const id = request.params.id;
//   const query = "SELECT * FROM tracks WHERE id=?";
//   const values = [id];

//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.post("/tracks", (request, response) => {
//   const tracks = request.body;
//   const query = "INSERT INTO tracks (title, duration) VALUES (?, ?); ";
//   const values = [tracks.title, tracks.duration];
//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.put("/tracks/:id", (request, response) => {
//   const id = request.params.id;
//   const track = request.body;
//   const query = "UPDATE tracks SET title=?, duration=? WHERE id=?;";
//   const values = [track.title, track.duration, id];

//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });

// app.delete("/tracks/:id", (request, response) => {
//   const id = request.params.id;
//   const query = "DELETE FROM tracks WHERE id=?;";
//   const values = [id];

//   connection.query(query, values, (error, results, fields) => {
//     if (error) {
//       console.log(error);
//     } else {
//       response.json(results);
//     }
//   });
// });
