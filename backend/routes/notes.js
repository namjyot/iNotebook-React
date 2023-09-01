const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
let success = false;

// Route 1: Fetching all the notes of a user; Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const data = await Note.find({ user: req.user });
    res.json(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Adding notes; Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title").isLength({ min: 3 }),
    body("description").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      success = false;
      return res.status(400).json({success, error: "Enter valid inputs"});
    }
    
    try {
      const note = await Note.create({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user,
      });
      success = true
      res.json({success, note});
    } catch (error) {
      success = false;
      res.status(500).json({success, error:"Internal Server Error"});
    }
  }
);

// Route 3: Updating a note; Login required
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  const { title, description, tag } = req.body;

  // Creating an object to insert updated values
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  // Fetching the note to be updated
  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      // if note doesn't exists
      success = false;
      return res.status(404).json({success, error:"Not Found"});
    }

    if (note.user.toString() !== req.user) {
      // if user updating any other note
      success = false;
      return res.status(401).json({success, error:"Not Allowed"});
    }

    // Updating the note with new object: "newNote"
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    success = true;
    res.json({success,note});
  } catch (error) {
    success = false;
    res.status(500).json({success, error: "Internal Server Error" });
  }
});

// Route 4: Deleting a note; Login required
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Note.findById(req.params.id);
    if (!note) {
      success = false;
      return res.status(404).json({success, error: "Not Found"});
    }

    if (note.user.toString() !== req.user) {
      success = false;
      return res.status(401).json({success, error:"Not Allowed"});
    }

    note = await Note.findByIdAndDelete(req.params.id);
    success = true;
    res.json({success, Success: "Note has been Deleted!" });
  } catch (error) {
    success = false;
    res.status(500).json({success, error: "Internal Server Error" });
  }
});

module.exports = router;
