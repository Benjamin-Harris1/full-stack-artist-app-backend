import express from "express";
import cors from "cors";
import { connection } from "./database.js";

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

app.get("/artists", (request, response) => {
  const query = "SELECT * FROM artists ORDER BY name;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.get("/artists/:id", (request, response) => {
  const id = Number(request.params.id);
  const query = "SELECT * FROM artists WHERE id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results[0]);
    }
  });
});

app.post("/artists", (request, response) => {
  const artist = request.body;
  const query = "INSERT INTO artists (name, career_start, image) VALUES (?, ?, ?)";
  const values = [artist.name, artist.career_start, artist.image];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.put("/artists/:id", (request, response) => {
  const id = request.params.id;
  const artist = request.body;
  const query = "UPDATE artists SET name=?, career_start=?, image=? WHERE id=?;";
  const values = [artist.name, artist.career_start, artist.image, id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.delete("/artists/:id", (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM artists WHERE id=?;";
  const values = [id];
});

app.get("/albums", (request, response) => {
  const query = "SELECT * FROM albums ORDER BY title;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.get("/albums/:id", (request, response) => {
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

app.post("/albums", (request, response) => {
  const album = request.body;
  const query = "INSERT INTO albums (artist_id, title, release_date, image) VALUES (?, ?, ?, ?)";
  const values = [album.artist_id, album.name, album.release_date, album.image];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.put("/albums/:id", (request, response) => {
  const id = request.params.id;
  const artist = request.body;
  const query = "UPDATE albums SET aritst_id=?, name=?, release_date=?, image=? WHERE id=?;";
  const values = [artist.name, artist.career_start, artist.image, id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.delete("/albums/:id", (request, response) => {
  const id = request.params.id;
  const query = "DELETE FROM albums WHERE id=?;";
  const values = [id];
});

// tracks route
app.get("/tracks", (request, response) => {
  const query = "SELECT * FROM tracks ORDER BY title;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.get("/tracks/:id", (request, response) => {
  const id = request.params.id;
  const query = "SELECT * FROM tracks WHERE id=?";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

// connection.query(query, values, (error, results, fields) => {
//   if (error) {
//     console.log(error);
//   } else {
//     response.json(results);
//   }
// });
