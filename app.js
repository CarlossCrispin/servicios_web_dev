var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const jwtMiddleware = require('express-jwt');

var indexRouter = require('./routes/index');

const users = require('./routes/users');
const places = require('./routes/places');
const sessions = require('./routes/sessions');
const favorites = require('./routes/favorites');

const db = require("./config/database");
const secrets = require('./config/secrets');

db.connect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());  
app.use(express.static(path.join(__dirname, 'public')));

app.use(jwtMiddleware({secret: secrets.jwtSecret})
  .unless({path:['/sessions']})
  // .unless({path:['/sessions', '/users'], method: 'GET'})
);

app.use('/', indexRouter);
app.use('/users', users);
app.use('/places',places);
app.use('/sessions',sessions);
app.use('/favorites',favorites); 


app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err.message);
});

module.exports = app;
