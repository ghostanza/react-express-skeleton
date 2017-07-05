import * as spotify from 'spotify';

export function updateSearchInfo(path, searchType, query){
  return {
    type: 'UPDATE_SEARCH_INFO',
    path,
    searchType,
    query
  }
}
export function getSearchResults(token, searchType, query){
  return{
    type: 'GET_SEARCH_RESULTS',
    payload: (searchType === 'genre' || searchType === 'label') ? spotify.getFilteredArtists(token, searchType, query) : spotify.getSearchResults(token, searchType, query)
  }
}
