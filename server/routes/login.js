"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const loginRoutes  = express.Router();

module.exports = function(DataHelpers) {

  loginRoutes.get("/", function(req, res) {
    if (!req.session.user) {
      res.status(400).json({ error: 'invalid request: user not logged in'});
    } else {
      res.status(201).send(req.session);
    }
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
        let user = result[0];
        req.session.user = user;
        res.status(201).send(req.session);
      }
    })
  });

  loginRoutes.get("/logout", function(req, res) {
    req.session = null;
    res.status(201).send();
  });

  return loginRoutes;

}
