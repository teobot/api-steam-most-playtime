# Connecting
Connecting to the api using
> http://localhost:3333/api/v1

# Resources
## Libraries
- Axios
  - https://www.npmjs.com/package/axios
- Config
  - https://www.npmjs.com/package/config
- JWT
  - https://www.npmjs.com/package/jsonwebtoken
- Express
  - https://www.npmjs.com/package/express
- MongoDB
  - https://www.npmjs.com/package/mongoose



## Development
### Adding a new route
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