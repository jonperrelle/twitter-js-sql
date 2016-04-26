var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');

router.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var tweets = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: tweets } );
});

router.get('/tweets/:id', function(req, res) {
  var id = +req.params.id;
  var tweets = tweetBank.find( {id: id} );
  res.render( 'index', { title: 'Twitter.js - Single Tweet ' + id, tweets: tweets } );
});

router.use(express.static('public'));

// write your own express.static - extra credit
//
// For every incoming request:
//
// Use request.path to get the route
// See if that route maps to a valid file in the public directory
// If not, go defer to the next matching middleware
// If the file matches, send over its contents

module.exports = router;
