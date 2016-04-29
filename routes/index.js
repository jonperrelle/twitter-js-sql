'use strict';
var express = require('express');
var router = express.Router();
var tweetBank = require('../tweetBank');

module.exports = function makeRouterWithSockets (io, client) {

  // a reusable function
  function respondWithAllTweets (req, res, next){
    client.query('SELECT name, content, tweets.id AS tweet_id, users.id AS user_id FROM tweets INNER JOIN users ON users.id = tweets.userid', function (err, result) {
      if(err) console.error(err);
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets, showForm: true });
    });

    // var allTheTweets = tweetBank.list();
    // res.render('index', {
    //   title: 'Twitter.js',
    //   tweets: allTheTweets,
    //   showForm: true
    // });
  }

  // here we basically treet the root view and tweets view as identical
  router.get('/', respondWithAllTweets);
  router.get('/tweets', respondWithAllTweets);

  // single-user page
  router.get('/users/:username', function(req, res, next){
    client.query('SELECT name, content, tweets.id AS tweet_id, users.id AS user_id FROM tweets INNER JOIN users ON users.id = tweets.userid WHERE name=$1', [req.params.username], function (err, result) {
      if(err) console.error(err);
      var tweets = result.rows;
      res.render('index', {
        title: 'Twitter.js',
        tweets: tweets,
        showForm: true,
        username: req.params.username,
        userid: tweets.user_id });
    });

    // var tweetsForName = tweetBank.find({ name: req.params.username, showForm: true, username: req.params.username });
    // res.render('index', {
    //   title: 'Twitter.js',
    //   tweets: tweetsForName,
    //   showForm: true,
    //   username: req.params.username
    // });
  });

  // single-tweet page
  router.get('/tweets/:id', function(req, res, next){
    client.query('SELECT name, content, tweets.id AS tweet_id, users.id AS user_id FROM tweets INNER JOIN users ON users.id = tweets.userid WHERE tweets.id=$1', [Number(req.params.id)], function (err, result) {
      if(err) console.error(err);
      var tweets = result.rows;
      res.render('index', { title: 'Twitter.js', tweets: tweets });
    });

    // var tweetsWithThatId = tweetBank.find({ id: Number(req.params.id) });
    // res.render('index', {
    //   title: 'Twitter.js',
    //   tweets: tweetsWithThatId // an array of only one element ;-)
    // });
  });

  // create a new tweet
  router.post('/tweets', function(req, res, next){

    client.query('SELECT id FROM users WHERE name = $1', [req.body.name],
      function(err, result) {
        var user = result.rows[0];
        if(!user) {
          client.query('INSERT INTO users (name) VALUES ($1) RETURNING ID', [req.body.name], function (err, data) {
             client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)',
                          [data.rows[0].id, req.body.text],
                          function (err, data) {});
          });
        } else {
        client.query('INSERT INTO tweets (userid, content) VALUES ($1, $2)',
                     [user.id, req.body.text],
                     function (err, data) {});
        }
      });
    // var newTweet = tweetBank.add(req.body.name, req.body.text);
    // io.sockets.emit('new_tweet', newTweet);
    res.redirect('/');
  });

  // // replaced this hard-coded route with general static routing in app.js
  // router.get('/stylesheets/style.css', function(req, res, next){
  //   res.sendFile('/stylesheets/style.css', { root: __dirname + '/../public/' });
  // });

  return router;
}
