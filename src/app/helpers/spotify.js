var axios = require('axios');

// access_token is required for this
module.exports.getUserInfo = (token) => {
  if(token){
    var config = {
      headers: {'Authorization': `Bearer ${token}`}
    };
    return axios.get('https://api.spotify.com/v1/me', config);
  }
  else{ return ''; }
}

/* accepts either a single id or an array of ids
  spotify.getAlbums('0sNOF9WDwhWunNAHPD3Baj')
  spotify.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ','6JWc4iAiJ9FjyK0B59ABb4','6UXCm6bOO4gFlDQZV5yL37'])
*/
module.exports.getAlbums = (ids, market) =>{
  return axios.get(`https://api.spotify.com/v1/albums/${typeof ids === 'object' ? `?ids=${ids.join(',')}`: ids}${market && typeof ids === 'object' ? `&market=${market}` : market ? `?market=${market}` : '' }`);
}

/* accepts either a single id or an array of ids
  spotify.getArtists('0OdUWJ0sBjDrqHygGUXeCF')
  spotify.getArtists(['0oSGxfWSnnOXhD2fKuz2Gy','3dBVyJ7JuOMt4GE9607Qin'])
*/
module.exports.getArtists = (ids) => {
  return axios.get(`https://api.spotify.com/v1/arists/${typeof ids === 'object' ? `?ids=${ids.join(',')}`: ids}`);
}

/*
 gets all the albums by an artists - accepts a single id and options

 options example:
 {
 album_type: (album, single, appears_on, compilation),
 market: (country code),
 limit: (number),
 offset: (0 is the default)
}
*/
module.exports.getArtistAlbums = (id, options) => {
  var query='';
  if(options){
    query+="?"
    var count = 1;
    for(item in options){
      query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
      count++
    }
  }
  return axios.get(`https://api.spotify.com/v1/artists/${id}${query}`);
}
