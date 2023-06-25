const mongoose = require("mongoose");

// Define the schema for the comments collection
const commentSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  textComment: {
    type: String,
    required: true,
  },
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
