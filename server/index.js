"use strict";

// Basic express setup:

const PORT = 8080;
const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Connect to MongoDB
MongoClient.connect('mongodb://localhost:27017/tweeter', (err, db) => {

  if (err) {
    console.log(`Failed to connect to mongodb`);
    throw err;
  }

  // We have a connection starting here.
  console.log(`Connected to mongodb`);

  // /users Routing and DataHelpers
  const usersDataHelpers = require("./lib/users-data-helpers.js")(db);
  const usersRoutes = require("./routes/users")(usersDataHelpers);
  app.use("/users", usersRoutes);

  // /tweets Routing and DataHelpers
  const tweetsDataHelpers = require("./lib/tweets-data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(tweetsDataHelpers);
  app.use("/tweets", tweetsRoutes);

  // /login Routing and DataHelpers
  const loginRoutes = require("./routes/login")(usersDataHelpers);
  app.use("/login", loginRoutes);

});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
