export default function reducer(state={
  token: document.cookie.replace(/.*token=([^;]*).*$/,"$1"),
  info: {},
  topArtists: {
    current_range: 'long_term',
    long_term: [],
    medium_term: [],
    short_term: []
  },
  recentlyPlayed: []
}, action){
  switch(action.type){
    case "SET_USER_NAME": {
      return { ...state, info: { other: action.name } }
      break;
    }
    case "CHANGE_TOP_ARTIST_RANGE":{
      var newState = Object.assign({}, state);
      newState.topArtists.current_range = action.changeTo;
      return newState;
      break;
    }
    // async
    case "GET_USER_INFO_FULFILLED":{
      return {...state, info: action.payload.data }
      break;
    }
    case "GET_TOP_ARTISTS_FULFILLED": {
      var newState = Object.assign({}, state);
      newState.topArtists[newState.topArtists.current_range] = action.payload.data.items;
      return newState;
      break;
    }
    case "GET_RECENTLY_PLAYED_FULFILLED":{
      return {...state, recentlyPlayed: action.payload.data.items};
      break;
    }
  }
  return state;
}
