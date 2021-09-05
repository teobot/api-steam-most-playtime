const config = require("../config/config");

const version = config.get("version");

const controller = require("../controllers/review.controller");

module.exports = function (app) {

  // This route creates a game and returns a joinable url and admin access token.
  app.route("/api/" + version + "/review").post(controller.getReview);
};