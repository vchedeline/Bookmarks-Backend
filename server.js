require("dotenv").config()
const express = require("express");
const req = require("express/lib/request");
const app = express();
const {PORT = 3001, DATABASE_URL } = process.env
const mongoose = require("mongoose");
const morgan = require ("morgan");
const cors = require ("cors");


//// Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))


/////Mongo Connection

mongoose.connect(DATABASE_URL)
mongoose.connection

.on("open",()=> console.log("You're connected"))
.on("close",()=> console.log("You're disconnected"))
.on("error",(error)=> console.log(error))

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
