var url = require('url'),
    request = require('request');

module.exports.tokenRequest = (code, res, req) => {
  var options = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': `Basic ${new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')}`
    },
    json: true
  };

  request.post(options, (err, response, body) => {
    var token = body.access_token,
        maxAge = body.expires_in,
        expiration = new Date(Number(new Date()) + (maxAge * 1000));
    //console.log("ACCESS TOKEN: ", token);
    //console.log("ACCESS EXPIRATION: ", maxAge);
    //console.log("EXPIRES: ", new Date(Number(new Date()) + (maxAge*1000)));
    res.cookie('token', token, { 'expires': expiration, httpOnly: false });
    res.redirect('/');
  });
}
