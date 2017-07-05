var axios = require('axios'),
    version = 'v1';



/***************  USER RELATED ENDPOINTS ***************************/
module.exports.getUserInfo = (token) => {
  if(token){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/me`, config);
  }
  else{ return Promise.resolve(''); }
}

// top tracks / artists
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


/********* TRACK RELATED ENDPOINTS *******************/
// returns detailed information about a given track ID
/* link to old EchoNest docs on interpreting the output of this call, the spotify docs don't have this explained yet:
https://web.archive.org/web/20160528174915/http://developer.echonest.com/docs/v4/_static/AnalyzeDocumentation.pdf
*/
module.exports.getAudioAnalysis = (token, track_id) => {
  if(token && track_id){
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

module.exports.getTrackInfo = (token, track_id) => {
  if(token && track_id){
    var config = { headers: {'Authorization': `Bearer ${token}`} };
    return axios.get(`https://api.spotify.com/${version}/tracks/${track_id}`, config);
  }
}

module.exports.getAllTrackInfo = (token, track_id) => {
  if(token && track_id){
    return axios.all([module.exports.getTrackInfo(token, track_id), module.exports.getAudioFeatures(token, track_id), module.exports.getAudioAnalysis(token, track_id)]);
  }
}

/***** ALBUM *****/

module.exports.getAlbumInfo = (token, album_id) => {
  if(token && album_id){
    var config = { headers : {'Authorization' : `Bearer ${token}`}};
    return axios.get(`https://api.spotify.com/${version}/albums/${album_id}`, config);
  }
}


/******* ARTIST RELATED ENDPOINTS **********/
module.exports.getArtists = (token, artist_ids) => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  return axios.get(`https://api.spotify.com/${version}/artists/${typeof artist_ids === 'object' ? `?ids=${artist_ids.join(',')}`: artist_ids}`, config);
}

module.exports.getRelatedArtists = (token, artist_id) => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/related-artists?limit=15`, config);
}
module.exports.getArtistTopTracks = (token, artist_id, country = 'US') => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/top-tracks?country=${country}`, config);
}

module.exports.getArtistAlbums = (token, artist_id, options) => {
  var config = { headers: {'Authorization': `Bearer ${token}`} };
  var query='';
  if(options){
    query+="?"
    var count = 1;
    for(var item in options){
      query += count > 1 ? `&${item}=${options[item]}` : `${item}=${options[item]}`;
      count++
    }
  }
  return axios.get(`https://api.spotify.com/${version}/artists/${artist_id}/albums/${query}`, config);
}

module.exports.getAllArtistInfo = (token, artist_id, country, options) => {
  return axios.all([module.exports.getArtists(token, artist_id), module.exports.getRelatedArtists(token, artist_id), module.exports.getArtistTopTracks(token, artist_id, country), module.exports.getArtistAlbums(token, artist_id, options), module.exports.getArtistAlbums(token, artist_id, {'album_type' : 'single', 'limit' : 20})]);
}

/*** SEARCH RELATED ENDPOINTS ***/

module.exports.getFilteredArtists = (token, filter, value, limit=30) => {
  var value = encodeURIComponent(value),
      config = { headers : {'Authorization': `Bearer ${token}`}},
      allowed = {
        'genre': 1,
        'label': 1
      };
  if(allowed[filter]){
    return axios.get(`https://api.spotify.com/${version}/search?q=${filter}:%22${value}%22&type=artist&limit=${limit}`, config);
  }
}

module.exports.getSearchResults = (token, searchType, query) => {
  var query = encodeURIComponent(query),
      config = { headers: {'Authorization': `Bearer ${token}`} },
      // TODO:  Change the hard-coded limit to an object so you can pass offsets too for multiple pages
      limit = 50;
  return axios.get(`https://api.spotify.com/${version}/search?q=${query}&type=${searchType}&limit=50`, config);
}

/***** TODO *****

  - add searching
  - move related endpoints into classes
  so you can do import { artistEndpoints } from 'spotify' and do artistEndpoints.getArtist
  rather than import * as spotify from 'spotify' and calling spotify.getArtist.
  It will make it easier to only import the endpoint functions necessary for the components

***/
