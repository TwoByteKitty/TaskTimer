const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const tasksRouter = require('./routes/tasks');
const createRouter = require('./routes/create');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/taskTracker", { useNewUrlParser: true });

const app = express();

// Register Handlebars view engine
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
//Use handlebars view engine
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use(createRouter);

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

module.exports = app;
