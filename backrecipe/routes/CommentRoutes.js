const express = require("express");
const CommentRouter = express.Router();
const Comment = require("../models/CommentModel");

// GET all comments
CommentRouter.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving comments." });
  }
});

// POST a new comment
CommentRouter.post("/", async (req, res) => {
  try {
    const { userName, textComment } = req.body;
    const comment = new Comment({ userName, textComment });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ error: "Failed to create a new comment." });
  }
});

// DELETE a comment
CommentRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(id);
    if (deletedComment) {
      res.json(deletedComment);
    } else {
      res.status(404).json({ error: "Comment not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment." });
  }
});

module.exports = CommentRouter;
