const createError = require('http-errors');
const debug = require('debug')('express-api:server');
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRoutes');
const tasksRouter = require('./routes/taskRoutes');

const PORT = process.env.PORT || '3000';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/taskTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// Register Handlebars view engine
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      refresh: () => process.env.BROWSER_REFRESH_URL,
      json: obj => JSON.stringify(obj),
      equals: (val1, val2) => val1 === val2 //This is a helper to see an object as a string on the page from handlebars.
    }
  })
);
//Use handlebars view engine
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/tasks', tasksRouter);

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
  res.render('error', { err });
});

app.listen(PORT, err => {
  if (err) {
    if (error.syscall !== 'listen') {
      throw error;
    }
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EADDRINUSE':
        console.error(`Port: ${PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  debug(`Listening on port: ${PORT}`);
  debug(`Environment: ${process.env.NODE_ENV}`);
  if (process.env.NODE_ENV === 'development' && process.send) {
    process.send({ event: 'online', url: `http://localhost:${PORT}/` });
  }
});
