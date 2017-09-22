"use strict";

const md5 = require('md5');

// Defines helper functions for saving, getting, and verifying users, using the database `db`
module.exports = function userDataHelpers(db) {
  return {

    saveUser: function (newUser, callback) {
      db.collection("users").insertOne(newUser, (err, result) => {
        callback(err, result);
      });
    },

    getUsers: function (callback) {
      db.collection("users").find().sort({ created_at: -1 }).toArray(callback);
    },

    verifyUserLogin: function (userHandle, userPassword, callback) {
      db.collection("users").find({handle: '@' + userHandle, password: md5(userPassword)}).toArray((err, documents) => {

        if (documents.length === 0) {
          const err = { message: 'No user found using those credentials' }
          callback(err, null);
          return;
        }

        callback(null, documents);
      });
    }

  };
}
