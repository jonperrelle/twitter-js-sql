var express = require('express');
var app = express();
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

app.get('/', function(req, res) {
  res.send('Hello World!');
  res.status = 200;
});

app.get('/home', function(req, res) {
  res.send('welcome home!');
    res.status = 200;
});

app.listen(3000, function() {
  console.log('Listening on port 3000!');
});
