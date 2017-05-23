var fs = require('fs'),
    path = require('path'),
    errorLog_500 = fs.createWriteStream(path.join(__dirname, '../logs/error_500.log'), {flags: 'a'}),
    errorLog_500Stack = fs.createWriteStream(path.join(__dirname, '../logs/error_500_stack.log'), {flags: 'a'}),
    errorLog_404 = fs.createWriteStream(path.join(__dirname, '../logs/error_404.log'), {flags: 'a'});

module.exports.log_500 = (err, req) => {
  var time = new Date();
  var errMessage = `${time.toString()} || IP: ${req.ip} || URL: ${req.originalUrl} ||`;
  errorLog_500.write(`${errMessage} ${err.toString()}\n`);
  errorLog_500Stack.write(`${errMessage} ${err.stack}\n\n`);
}

module.exports.log_404 = (req) => {
  var time = new Date(),
      errMessage = `${time.toString()} || IP: ${req.ip} || URL: ${req.originalUrl}\n`;
  errorLog_404.write(errMessage);
}
