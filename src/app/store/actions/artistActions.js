import * as spotify from 'spotify';

export function setCurrentArtist(id){
  return {
    type: "SET_CURRENT_ARTIST",
    id
  }
}
export function getArtistInfo(token, id){
  return {
    type: "GET_ARTIST_INFO",
    payload: spotify.getArtists(token, id)
  }
}
export function getRelatedArtists(token, id){
  return {
    type: "GET_RELATED_ARTISTS",
    payload: spotify.getRelatedArtists(token, id)
  }
}
export function getArtistAlbums(token, id){
  return{
    type: "GET_ARTIST_ALBUMS",
    payload: spotify.getArtistAlbums(token, id, {album_type: 'album', limit: 50})
  }
}
export function getArtistTopTracks(token, id){
  return{
    type: "GET_ARTIST_TOP_TRACKS",
    payload: spotify.getArtistTopTracks(token, id)
  }
}
export function getAllArtistInfo(token, id){
  return {
    type: "GET_ALL_ARTIST_INFO",
    payload: spotify.getAllArtistInfo(token, id, 'US', {album_type: 'album', limit: 20})
  }
}
