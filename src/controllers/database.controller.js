// Require config
const config = require("../config/config");

// Import JWT
var jwt = require("jsonwebtoken");

// Import mongoose
const mongoose = require("mongoose");

// Require mongoose schema
const Review = mongoose.model("Review");

// CreateGame function creates a yoinked game when triggered.
// const savedToBeUpdated = async (id) => {
//   // TODO: save the gameId to be updated in the gamebase later
//   return { success: false, id };
// };

const saveReviewToDatabase = async (id, reviewData) => {
  // : save the given review to the database
  if (!reviewData.review) {
    return { success: false, id, error, reviewData: null };
  }

  try {
    const review = new Review({
      gameId: id,
      review: reviewData.review,
      time_taken: reviewData.time_taken,
      created: new Date(),
      updated: new Date(),
      number_of_reviews: reviewData.number_of_reviews,
    });
    await review.save();
    return { success: true, id, review: review };
  } catch (error) {
    return { success: false, id, message: error.message, reviewData: null };
  }
};

// export all functions
module.exports = {
  saveReviewToDatabase,
};
