// Require config
const config = require("../config/config");

// Import mongoose
const mongoose = require("mongoose");

// Import Review Schema
const Review = mongoose.model("Review");

// CreateGame function creates a yoinked game when triggered.
const searchDatabaseForGame = async (id) => {
  // : Check the database for the game from the given ID
  const review = await Review.findOne({ gameId: id });

  if (!review) {
    return { saved: false, review: null };
  } else {
    return { saved: true, review };
  }
};

// export all functions
module.exports = {
  searchDatabaseForGame,
};
