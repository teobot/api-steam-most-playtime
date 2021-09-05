# Resources
## Libraries
- Axios
  - web calls
  - https://www.npmjs.com/package/axios


# Development
## Adding a new route
1. Create the routes file using the boilerplate code below in the folder `./src/routes`.
```javascript
const config = require("../config/config");

const version = config.get("version");

const controller = require("../controllers/CONTROLLER_NAME");

module.exports = function (app) {

  // This route creates a game and returns a joinable url and admin access token.
  app.route("/api/" + version + "/ROUTE_SLUG").get(controller.CONTROLLER_FUNCTION);
};
```
2. Then Create the controller in the folder `./src/controllers` using the boilerplate code.
```javascript
// Require config
const config = require("../config/config");

// Import JWT
var jwt = require('jsonwebtoken');

// CreateGame function creates a yoinked game when triggered.
const CONTROLLER_FUNCTION = async (req, res) => {
  return res.send({ message: "Hello World!" });
};

// export all functions
module.exports = {
  CONTROLLER_FUNCTION,
};
```
3. Add the route file in the directory: `./src/config/express.js` add the route file using the code below.
```javascript
require("../routes/ROUTE_FILE")(app);
```