// pull in the Sequelize library
var Sequelize = require('sequelize');

// create an instance of a database connection
// which abstractly represents our app's sqlite database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
  dialect: 'sqlite',
  storage: '../twitterjs.db'
});

var Tweet = require('./tweet')(twitterjsDB);
var User = require('./user')(twitterjsDB);

// adds a UserId foreign key to the `Tweets` table
User.hasMany(Tweet);
Tweet.belongsTo(User);

// open the connection to our database
twitterjsDB
.authenticate()
.then(function () {
  console.log('Database connection established, dawg.');
})
.catch(function (err) {
  console.error('Problem connecting to the database:', err);
});

User.findOne()
.then(function (user) {
  // big old crazy object, but no name or
  // id anywhere in there. Hmmmmmm…
  console.log(user);
});

// User.findOne()
// .then(function (user) {
//   // produces expected output. WAT.
//   console.log(user.name);
// });

module.exports = {
  User: User,
  Tweet: Tweet
};
