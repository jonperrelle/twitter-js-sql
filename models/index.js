// pull in the Sequelize library
var Sequelize = require('sequelize');

// create an instance of a database connection
// which abstractly represents our app's sqlite database
var twitterjsDB = new Sequelize('twitterjs', 'root', null, {
  dialect: 'sqlite',
  storage: '../../path/to/your/twitterjs.db'
});

// open the connection to our database
twitterjsDB
.authenticate()
.then(function () {
  console.log('Database connection established, dawg.');
})
.catch(function (err) {
  console.error('Problem connecting to the database:', err);
});
