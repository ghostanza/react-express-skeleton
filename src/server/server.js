require('dotenv').config();

var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    morgan = require('morgan'),
    chalk = require('chalk'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    logger = require('./modules/logger.js'),
    routes = require('./routes/main.js'),
    accessLog = fs.createWriteStream(path.join(__dirname, './logs/access.log'), {flags: 'a'});

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));

// use morgan to log requests
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status ":user-agent"', {stream: accessLog}));

// use the router
app.use(routes);

// 404 handler
app.use((req, res, next) => {
  logger.log_404(req);
  res.status(404);
  res.redirect('/');
});

// 500 handler
app.use((err, req, res, next) => {
  logger.log_500(err, req);
  res.send("500 error");
});


app.listen('8080', '127.0.0.1');
console.log(chalk.bold.green("Listening on port 8080!"));
module.exports = app;
