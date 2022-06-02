const express = require("express");
const req = require("express/lib/request");
const app = express();
const PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/bookmarks", (req, res) => {
  res.send("Index Page");
});

app.post("/bookmarks", (req, res) => {
  res.send("Create Page");
});

app.put("/bookmarks/:id", (req, res) => {
  res.send("Update Page");
});

app.delete("/bookmarks/:id", (req, res) => {
  res.send("Delete Page");
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
