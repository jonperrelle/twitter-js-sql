var express = require('express');
var app = express();
var swig = require('swig');
//middleware
app.use(function(req, res, next) {
  console.log(req.method);
  console.log(req.url);
  console.log(req.status);
  next();
});
// url specific middleware
// app.use('/home', function(req, res, next) {
//   console.log(req.method);
//   console.log(req.url);
//   next();
// });

// app.get('/', function(req, res) {
//   res.send('Hello World!');
//   res.status = 200;
// });

app.get('/home', function(req, res) {
  res.send('welcome home!');
    res.status = 200;
});

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

app.get('/', function (req, res) {
  res.render('index', locals);
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
