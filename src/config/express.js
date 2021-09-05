const config = require("./config.js");
const version = config.get("version");

const express = require("express");

module.exports = function () {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use((req, res, next) => {
    console.log(`##### ${req.method} ${req.path} #####`);
    next();
  });

  app.get("/api/" + version, function (req, res) {
    return res.send({ msg: "Server up" });
  });

  // Require all new routes here
  require("../routes/review.route")(app);

  return app;
};
