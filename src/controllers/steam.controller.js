// Require config
const config = require("../config/config");

// import the steam api
const { getAppReviews } = require("../api/steamdb");
const { getSecondsBetweenDates } = require("../functions/general.functions");

const REVIEW_PRIORITIZE = "playtime_forever";

// CreateGame function creates a yoinked game when triggered.
const getReviewFromGameId = async (id) => {
  return await getAllGameReviews(id);
};

const getAllGameReviews = async (id) => {
  let start_time = new Date();
  let cursor = "*";
  let number_of_reviews = 0;
  let numberOfRuns = 0;
  let review = null;
  let empty = false;
  try {
    while (!empty) {
      numberOfRuns++;
      const response = await getAppReviews(id, cursor);
      if (response.query_summary.num_reviews === 0) {
        empty = true;
      } else {
        number_of_reviews += response.reviews.length;
        cursor = response.cursor;
        if (review === null) {
          review = response.reviews[0];
        }
        for (let i = 0; i < response.reviews.length; i++) {
          const response_review = response.reviews[i];
          // Check the playtime here
          if (
            review.author[REVIEW_PRIORITIZE] <
            response_review.author[REVIEW_PRIORITIZE]
          ) {
            review = response_review;
          }
        }
      }
    }
    return {
      number_of_reviews,
      numberOfRuns,
      review,
      time_taken: getSecondsBetweenDates(start_time, new Date()),
    };
  } catch (error) {
    console.log(error);
    return {
      number_of_reviews,
      numberOfRuns,
      review,
      time_taken: getSecondsBetweenDates(start_time, new Date()),
    };
  }
};

// export all functions
module.exports = {
  getReviewFromGameId,
};
