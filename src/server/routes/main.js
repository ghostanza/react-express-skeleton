var express = require('express'),
    router = express.Router(),
    url = require('url'),
    path = require('path'),
    logger = require('../modules/logger'),
    fs = require('fs'),
    request = require('request'),
    auth_handler = require('../modules/auth_handler'),
    errorLog_404 = fs.createWriteStream(path.join(__dirname, '../logs/error_404.log'), {flags: 'a'});

// API routes
router.get('/api/v1/:endpoint', (req,res,next) => {
  var endpoint = req.params.endpoint || '';
    switch(endpoint){
      case 'callback':
        var code = req.query.code;
        auth_handler.tokenRequest(code, 'initial', res, req);
        break;
      case 'code':
        res.send("FETCHING THE CODE...")
        break;
      case 'token':
        var refresh = req.query.refresh;
        auth_handler.tokenRequest(refresh, 'refresh', res, req);
        break;
      default:
        //logger.log_404(req);
        res.status(404);
        res.send("CANNOT FIND ENDPOINT");
        break;
    }
})

// main app
router.get(['/', '/artist/*', '/album/*', '/search/*'], (req, res, next) => {
  res.sendFile(path.join(__dirname, '../../../public/index.html'));
});

module.exports = router;
