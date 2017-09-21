"use strict";

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function tweetDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function (newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, (err, result) => {
        callback(null, true);
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function (callback) {
      db.collection("tweets").find().sort({ created_at: -1 }).toArray(callback);
    },

    updateTweet: function (id, liked, callback) {
      const change = (liked == 'true') ? -1 : 1;
      const mongoID = require('mongodb').ObjectID(id);
      db.collection("tweets").updateOne({ '_id': mongoID }, { $inc: { likes: change } }, (err, tweet) => {
        if (err) throw err;
        callback(null, tweet);
      });
    }

  };
}
