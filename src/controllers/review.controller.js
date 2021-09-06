// Require config
const config = require("../config/config");

// Import mongoose
const mongoose = require("mongoose");

// Require mongoose schema
const Review = mongoose.model("Review");

// controller imports
const { searchDatabaseForGame } = require("../controllers/search.controller");
const {
  savedToBeUpdated,
  saveReviewToDatabase,
} = require("../controllers/database.controller");
const { getReviewFromGameId } = require("../controllers/steam.controller");

// CreateGame function creates a yoinked game when triggered.
const getReview = async (req, res) => {
  // get the game name
  const { game_id } = req.body;

  // Search for the game in the database
  const databaseSearch = await searchDatabaseForGame(game_id);

  // Check if the game is in the database
  if (databaseSearch.saved) {
    // Game IS saved in the database

    // Return the review to the user
    return res.send(databaseSearch.review);
  } else {
    // Game IS NOT saved in the database

    // Get the highest playtime review
    const reviewData = await getReviewFromGameId(game_id);

    // Save the game to the database
    // await saveReviewToDatabase(game_id, reviewData);
    // try using without a await so that the information is send quicker back to the user
    const database_data = await saveReviewToDatabase(game_id, reviewData);

    // Save the game to be updated in the database daily
    // await savedToBeUpdated(game_id);
    // this is remove for now, think about when the information should load

    // Return the game review back to the user
    return res.send(database_data.review);
  }
};

// export all functions
module.exports = {
  getReview: getReview,
};
