const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  gameId: Number,
  review: {
    type: Object,
  },
  time_taken: {
    type: Number,
    default: null,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
    default: new Date(),
  },
  number_of_reviews: {
    type: Number,
    default: null,
  },
});

mongoose.model(`Review`, reviewSchema);
