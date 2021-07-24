var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
const middleware = require('./middleware,js/token')


var indexRouter = require('./routes/index');
var studentRouter = require('./routes/student');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', studentRouter);
app.use('/admin', indexRouter);
app.use('/add',middleware.validateToken,indexRouter);
app.use('/update',indexRouter);
app.use('/delete',indexRouter);

mongoose.connect(
  'mongodb://localhost:27017/assignment',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  function (err) {
    if (err) throw err;
    else console.log('Database connnected');
  }
);

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
  res.render('error');
});
console.log("running.....");

module.exports = app;
