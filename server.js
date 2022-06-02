require("dotenv").config()
const express = require("express");
const req = require("express/lib/request");
const app = express();
const {PORT = 3001, DATABASE_URL } = process.env
const mongoose = require("mongoose");
const morgan = require ("morgan");
const cors = require ("cors");
const { Schema, model } = require("mongoose");


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

// Schema
const bookmarkSchema = new Schema (
  {
    title: String,
    url: String,
  },
);

const Bookmark = model("Bookmark", bookmarkSchema);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/bookmarks", async (req, res) => {
  try {
    res.json(await Bookmark.find({}));
  } catch (error) {
    res.status(400).json(error);
  }
});


app.post("/bookmarks", async (req, res) => {
  try {
    res.json(await Bookmark.create(req.body));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.put("/bookmarks/:id", async (req, res) => {
  try {
    res.json(
      await Bookmark.findByIdAndUpdate(req.params.id, req.body, { new: true })
    );
  } catch (error) {
    res.status(400).json(error);
  }
});

app.delete("/bookmarks/:id", async (req, res) => {
  try {
    res.json(await Bookmark.findByIdAndDelete(req.params.id));
  } catch (error) {
    res.status(400).json(error);
  }
});

app.listen(PORT, () => console.log(`Listening on Port ${PORT}...`));
