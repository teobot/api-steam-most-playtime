const config = require("../config/config");

const version = config.get("version");

const controller = require("../controllers/review.controller");
const steamApi = require("../api/steamdb");

module.exports = function (app) {
  // This route creates a game and returns a joinable url and admin access token.
  app.route("/api/" + version + "/review").post(controller.getReview);

  // app.route("/api/" + version + "/game").get(async (req, res) => {
  //   try {
  //     const info = await steamApi.getGameInfo(req.body.game_id);
  //     res.send(info.data);
  //   } catch (error) {
  //     res.send(error.message);
  //   }
  // });
};
