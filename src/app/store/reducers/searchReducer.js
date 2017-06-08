const initialState = {
  searchHistory: [],
  searchTerm: '',
  searchType: '',
  searchResults: {
    artists: [],
    albums: [],
    playlists: [],
  },
  isLoading: false
}

export default function reducer(state=initialState, action){
  switch(action.type){
    case 'UPDATE_SEARCH_INFO': {
      return { ...state, searchHistory: [ { term: action.query, path: action.path }, ...state.searchHistory ], searchTerm: action.query, searchType: action.searchType};
    }
    case 'GET_SEARCH_RESULTS_PENDING': {
      return { ...state, isLoading: true }
    }
    case 'GET_SEARCH_RESULTS_FULFILLED': {
      var newState = Object.assign({}, state);
      if(action.payload.data.artists){
        newState.searchResults.artists = action.payload.data.artists.items;
      }
      if(action.payload.data.albums){
        newState.searchResults.albums = action.payload.data.albums.items;
      }
      if(action.payload.data.playlists){
        newState.searchResults.playlists = action.payload.data.playlists.items;
      }
      newState.isLoading = false;
      return newState;
    }
  }
  return state;
}
