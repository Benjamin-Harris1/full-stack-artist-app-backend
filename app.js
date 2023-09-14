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

app.get("/users", async (request, response) => {
  const query = "SELECT * FROM users ORDER BY name;";
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.get("/users/:id", async (request, response) => {
  const id = Number(request.params.id);
  const query = "SELECT * FROM users WHERE id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.post("/users", async (request, response) => {
  const user = request.body;
  const query =
    "INSERT INTO users (name, mail, title, image) VALUES (?, ?, ?, ?)";
  const values = [user.name, user.mail, user.title, user.image];
  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.put("/users/:id", async (request, response) => {
  const id = Number(request.params.id);
  const user = request.body;
  const query = "UPDATE users SET name=?, mail=?, title=?, image=? WHERE id=?;";
  const values = [user.name, user.mail, user.title, user.image, id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});

app.delete("/users/:id", async (request, response) => {
  const id = Number(request.params.id);
  const query = "DELETE FROM users WHERE id=?;";
  const values = [id];

  connection.query(query, values, (error, results, fields) => {
    if (error) {
      console.log(error);
    } else {
      response.json(results);
    }
  });
});
