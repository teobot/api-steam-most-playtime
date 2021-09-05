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
  let numberOfReviews = 0;
  let numberOfRuns = 0;
  let hightestPlayTimeReview = null;
  let empty = false;
  try {
    while (!empty) {
      numberOfRuns++;
      const response = await getAppReviews(id, cursor);
      if (response.query_summary.num_reviews === 0) {
        empty = true;
      } else {
        numberOfReviews += response.reviews.length;
        cursor = response.cursor;
        if (hightestPlayTimeReview === null) {
          hightestPlayTimeReview = response.reviews[0];
        }
        for (let i = 0; i < response.reviews.length; i++) {
          const review = response.reviews[i];
          // Check the playtime here
          if (
            hightestPlayTimeReview.author[REVIEW_PRIORITIZE] <
            review.author[REVIEW_PRIORITIZE]
          ) {
            hightestPlayTimeReview = review;
          }
        }
      }
    }
    return {
      numberOfReviews,
      numberOfRuns,
      hightestPlayTimeReview,
      time_taken: getSecondsBetweenDates(start_time, new Date()),
    };
  } catch (error) {
    console.log(error);
    return {
      numberOfReviews,
      numberOfRuns,
      hightestPlayTimeReview,
      time_taken: getSecondsBetweenDates(start_time, new Date()),
    };
  }
};

// export all functions
module.exports = {
  getReviewFromGameId,
};
