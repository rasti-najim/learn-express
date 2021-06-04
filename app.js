const Joi = require("joi");
const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const debug = require("debug")("app:startup"); // since we usually use one per file/module, we use debug as the naming convention
const dbDebug = require("debug")("app:db");

// custom imports
const logger = require("./middleware/logger");
const users = require("./routes/users");
const home = require("./routes/home");

const app = express();

app.use(express.json());
app.use(helmet());
app.use("/api/users", users);
app.use("/", home);
// we only enable morgan in development
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  // console.log("Morgan enabled...")
  debug("Morgan enabled...");
}

// db work for example
// dbDebug("Connected to the database!");

// custom middleware
app.use(logger);
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
