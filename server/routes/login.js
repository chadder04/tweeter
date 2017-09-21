"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const loginRoutes  = express.Router();

module.exports = function(DataHelpers) {

  loginRoutes.get("/", function(req, res) {
    res.send("I'm gunna GET-IIIT");
  });

  loginRoutes.post("/", function(req, res) {
    if (!req.body.userHandle || !req.body.userPassword) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    DataHelpers.verifyUserLogin(req.body.userHandle, req.body.userPassword, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send("Login Success!");
      }
    })
  });

  loginRoutes.put("/", function(req, res) {
    
  });

  return loginRoutes;

}
