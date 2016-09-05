// =================================================================
// get the packages we need ========================================
// =================================================================
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// ---------------------------------------------------------
// load application routes
// ---------------------------------------------------------
var routes = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');
var guest = require('./routes/guest');

// =================================================================
// configuration ===================================================
// =================================================================
var appConfig = require("./config.json"),
    serverConfig = appConfig.server,
    dbConfig = appConfig.database,
    tokenConfig = appConfig.token;

// Use native Node promises
mongoose.Promise = global.Promise;
// connect to mongoose
mongoose.connect(dbConfig.connectionString)
  .then(() => console.log('connection succesful') )
  .catch((err) => console.error(err));

var app = express();

// ---------------------------------------------------------
// view engine setup
// ---------------------------------------------------------
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// =================================================================
// routes ==========================================================
// =================================================================
app.use('/', routes);
app.use('/api/users', users);
app.use('/api/todos', todos);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, UPDATE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "Not found.", status: 404 });
});

// =================================================================
// error handlers ==================================================
// =================================================================

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    //res.render('error', { message: err.message, error: {} });
    res.json({ message: err.message, errorStack: err.stack });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message, error: {} });
});

module.exports = app;
