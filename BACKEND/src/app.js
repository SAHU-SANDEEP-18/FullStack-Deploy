const express = require("express");
const noteModel = require("./models/notes.model");
const cors = require("cors");
const app = express();
const path = require("path");
app.use(cors());
app.use(express.json());
app.use(express.static("./public"))

// POST Create Note
// req.body => {title,description}

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

// GET /api/notes
// Fetch all the notes data from mongodb and send them in the reponse

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});

//DELETE /api/notes/:id
//delete note with the id from req.params

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await noteModel.findOneAndDelete(id);
  res.status(200).json({
    message: "Notes deleted successfully.",
  });
});

//PATCH /api/notes/:id
//update the description of the note by id
//req.body = {description}

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });
  res.status(200).json({
    message: "Note Updated successfully",
  });
});

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

module.exports = app;
