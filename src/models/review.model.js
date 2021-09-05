const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  gameId: Number,
  review: {
    type: Object,
  },
  time_taken: Number,
  created: Date,
  updated: {
    type: Date,
    default: null,
  },
});

mongoose.model(`Review`, reviewSchema);
