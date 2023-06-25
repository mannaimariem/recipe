const express = require("express");
const RecipeRouter = express.Router();
const Recipe = require("../models/RecipeModel");

// GET all recipes
RecipeRouter.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recipes." });
  }
});

// POST a new recipe
RecipeRouter.post("/", async (req, res) => {
  try {
    const { title, rating, description, posterUrl, ingredients, preparation } =
      req.body;
    const recipe = new Recipe({
      title,
      rating,
      description,
      posterUrl,
      ingredients,
      preparation,
    });
    const savedRecipe = await recipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ error: "Failed to create a new recipe." });
  }
});

// DELETE a recipe
RecipeRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    if (deletedRecipe) {
      res.json(deletedRecipe);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the recipe." });
  }
});

// PUT (update) a recipe
RecipeRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, rating, description, posterUrl, ingredients, preparation } =
      req.body;
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, rating, description, posterUrl, ingredients, preparation },
      { new: true }
    );
    if (updatedRecipe) {
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the recipe." });
  }
});

module.exports = RecipeRouter;
