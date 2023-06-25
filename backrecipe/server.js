const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const CommentRoutes = require("./routes/CommentRoutes");
const RecipeRoutes = require("./routes/RecipeRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (you can restrict it to specific origins)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers
  next();
});

// Connect to the MongoDB database
mongoose;
mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.zfbog2n.mongodb.net/mydatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Routes
// Define your API routes here
app.get("/", (req, res) => {
  res.send("SERVER");
});
app.use("/api/comments", CommentRoutes);
app.use("/api/recipes", RecipeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
