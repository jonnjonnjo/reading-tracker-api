require('dotenv').config();
var express = require('express');
var logger = require('morgan');
var createError = require('http-errors');
var authCheck = require("./middleware/auth")

var indexRouter = require('./routes/index');
var readsRouter = require('./routes/reads');

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(authCheck);

app.use('/', indexRouter);
app.use('/reads', readsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    error: err.message,
  });
});

module.exports = app;
