"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const usersRoutes  = express.Router();

module.exports = function(DataHelpers) {

  usersRoutes.get("/", function(req, res) {
    DataHelpers.getUsers((err, users) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(users);
      }
    });
  });

  usersRoutes.post("/", function(req, res) {
    if (!req.body.userName || !req.body.userHandle) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = userHelper.generateNewUser(req.body.userName, req.body.userHandle, req.body.userPassword);
    
    DataHelpers.saveUser(user, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        req.session.user = user;        
        res.status(201).redirect('/');
      }
    });
  });

  usersRoutes.put("/", function(req, res) {
    
  });

  return usersRoutes;

}
