var express = require('express');
var app = express();
var swig = require('swig');
var routes = require('./routes/');

app.use('/', routes);


// swig integrations

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var locals = {
    title: 'An Example',
    people: [
        { name: 'Gandalf'},
        { name: 'Frodo' },
        { name: 'Hermione'}
    ]
};
swig.renderFile(__dirname + '/views/index.html', locals, function (err, output) {
    console.log(output);
});

// app.get('/', function (req, res) {
//   res.render('index', locals);
// });

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
