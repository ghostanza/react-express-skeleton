import * as spotify from 'spotify';

export function setCurrentGenre(genre){
  return {
    type: "SET_CURRENT_GENRE",
    genre
  }
}
export function getGenreArtists(token, genre){
  return {
    type: "GET_GENRE_ARTISTS",
    payload: spotify.getGenreArtists(token, genre)
  }
}
