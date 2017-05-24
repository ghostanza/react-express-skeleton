var express = require('express'),
    router = express.Router(),
    url = require('url'),
    path = require('path'),
    logger = require('../modules/logger'),
    fs = require('fs'),
    request = require('request'),
    auth_handler = require('../modules/auth_handler'),
    errorLog_404 = fs.createWriteStream(path.join(__dirname, '../logs/error_404.log'), {flags: 'a'});

// main app
router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

// API routes
router.get('/api/v1/:endpoint', (req,res,next) => {
  var endpoint = req.params.endpoint || '';
    switch(endpoint){
      case 'callback':
        var code = req.query.code;
        auth_handler.tokenRequest(code, res, req);
        break;
      case 'code':
        res.send("FETCHING THE CODE...")
        break;
      case 'token':
        res.send("FETCHING THE TOKEN FOR YA...");
        break;
      default:
        logger.log_404(req);
        res.status(404);
        res.send("CANNOT FIND ENDPOINT");
        break;
    }
})

module.exports = router;
