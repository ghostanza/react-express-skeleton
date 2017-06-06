const initialState = {
  token: document.cookie.replace(/.*token=([^;]*).*$/,"$1"),
  info: {},
  top: {
    artists: {
      current_range: 'long_term',
      long_term: [],
      medium_term: [],
      short_term: []
    },
    tracks: {
      current_range: 'long_term',
      long_term: [],
      medium_term: [],
      short_term: []
    }
  },
  recentlyPlayed: []
};

export default function reducer(state=initialState, action){
  switch(action.type){
    case "SET_USER_NAME": {
      return { ...state, info: { other: action.name } }
      break;
    }
    case "CHANGE_TOP_ITEMS_RANGE":{
      var newState = Object.assign({}, state);
      newState.top[action.itemType].current_range = action.changeTo;
      return newState;
      break;
    }
    // async
    case "GET_USER_INFO_FULFILLED":{
      return {...state, info: action.payload.data }
      break;
    }
    case "GET_TOP_ITEMS_FULFILLED": {
      var newState = Object.assign({}, state),
          itemType = action.payload.data.href.match(/artists|tracks/g)[0];
      newState.top[itemType][newState.top[itemType].current_range] = action.payload.data.items;
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
