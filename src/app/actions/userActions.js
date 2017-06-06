import * as spotify from 'spotify';

export function getUserInfo(token){
  return{
    type: "GET_USER_INFO",
    payload: spotify.getUserInfo(token)
  }
}

export function getTopArtists(token, options){
  return {
    type: "GET_TOP_ARTISTS",
    payload: spotify.getTop(token, 'artists', options)
  }
}

export function changeTopArtistRange(range){
  return {
    type: "CHANGE_TOP_ARTIST_RANGE",
    changeTo: range
  }
}

/*

import * as user from ./userActions.js

user.setUserName('blahhh');

*/
