"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function userDataHelpers(db) {
  return {

    saveUser: function(newUser, callback) {
      db.collection("users").insertOne(newUser, (err, result) => {
          callback(err, result);
      });
    },

    getUsers: function(callback) {
        db.collection("users").find().sort({created_at: -1}).toArray(callback);        
    }

  };
}
