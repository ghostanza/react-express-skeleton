const initialState = {
  current_genre: '',
  genre_artists: [],
  isLoading: false
}
export default function reducer(state=initialState, action){
  switch(action.type){
    case 'SET_CURRENT_GENRE': {
      return { ...state, current_genre: action.genre };
      break;
    }
    case 'GET_GENRE_ARTISTS_PENDING': {
      return { ...state, isLoading: true };
      break;
    }
    case 'GET_GENRE_ARTISTS_FULFILLED': {
      return { ...state, genre_artists: action.payload.data.artists.items, isLoading: false }
      break;
    }
  }
  return state;
}
