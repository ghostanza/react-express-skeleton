var axios = require('axios'),
    version = 'v1';



/*** TOKEN REQUIRED
  the following calls require an access_token
***/

// returns basic information about the user (username, display name, email)
module.exports.getUserInfo = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me`, config);
  }
  else{ return Promise.resolve(''); }
}

// returns information about the spotify player -- currently playing track, device, etc.
module.exports.getPlayerInfo = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me/player`, config);
  }
  else{ return Promise.resolve(''); }
}

module.exports.getCurrentlyPlaying = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me/player/currently-playing`, config);
  }
  else{ return Promise.resolve(''); }
}


module.exports.getRecentlyPlayed = (token, options) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} },
        query='';
    if(options){
      query+="?"
      var count = 1;
      for(var item in options){
        query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
        count++
      }
    }
    return axios.get(`https://api.spotify.com/${version}/me/player/recently-played${query}`, config);
  }
  else { return Promise.resolve(''); }
}

// returns detailed information about a given track ID
module.exports.getAudioAnalysis = (token, track_id) => {
  if(token && id){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/audio-analysis/${track_id}`, config);
  }
  else{ return Promise.resolve(''); }
}

// returns primary features (energy, danceability, etc.) of a given track ID or array of track IDs
module.exports.getAudioFeatures = (token, track_ids) => {
  if(token && track_ids){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/audio-features/${typeof track_ids === 'object' ? `?ids=${track_ids.join(',')}`: track_ids}`, config);
  }
  else{  return Promise.resolve(''); }
}

module.exports.getTop = (token, type, options) => {
  if(token && type){
    var config = { headers: {'Authorization': `Bearer ${token}`} },
        query='';
    if(options){
      query+="?"
      var count = 1;
      for(var item in options){
        query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
        count++
      }
    }
    return axios.get(`https://api.spotify.com/${version}/me/top/${type}${query}`, config);
  }
  else{ return Promise.resolve(''); }
}


/******** TOKEN NOT REQUIRED
  the following calls do not require an access_token
*********/

/*
  accepts either a single id or an array of ids
  spotify.getAlbums('0sNOF9WDwhWunNAHPD3Baj')
  spotify.getAlbums(['41MnTivkwTO3UUJ8DrqEJJ','6JWc4iAiJ9FjyK0B59ABb4','6UXCm6bOO4gFlDQZV5yL37'])
*/
module.exports.getAlbums = (album_ids, market) =>{
  return axios.get(`https://api.spotify.com/${version}/albums/${typeof album_ids === 'object' ? `?ids=${album_ids.join(',')}`: album_ids}${market && typeof album_ids === 'object' ? `&market=${market}` : market ? `?market=${market}` : '' }`);
}

/* accepts either a single id or an array of ids
  spotify.getArtists('0OdUWJ0sBjDrqHygGUXeCF')
  spotify.getArtists(['0oSGxfWSnnOXhD2fKuz2Gy','3dBVyJ7JuOMt4GE9607Qin'])
*/
module.exports.getArtists = (artist_ids) => {
  return axios.get(`https://api.spotify.com/${version}/artists/${typeof artist_ids === 'object' ? `?ids=${artist_ids.join(',')}`: artist_ids}`);
}


module.exports.getArtistTopTracks = (artist_id, country = 'US') => {
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/top-tracks?country=${country}`);
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
module.exports.getArtistAlbums = (artist_id, options) => {
  var query='';
  if(options){
    query+="?"
    var count = 1;
    for(var item in options){
      query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
      count++
    }
  }
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}${query}`);
}
