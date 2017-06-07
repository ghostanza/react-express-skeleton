const initialState = {
  current_track_id: '',
  info: {},
  analysis: {},
  features: {},
  is_loading: false
};

export default function reducer(state = initialState, action){
  switch(action.type){
    case "SET_CURRENT_TRACK_ID": {
      return {...state, current_track_id: action.trackId };
      break;
    }
    case "GET_TRACK_INFO_FULFILLED": {
      return {...state, info: action.payload.data };
      break;
    }
    case "GET_TRACK_ANALYSIS_PENDING":{
      var newState = Object.assign({}, state);
      newState.analysis.isLoading = true;
      return newState;
      break;
    }
    case "GET_TRACK_ANALYSIS_FULFILLED": {
      var newState = Object.assign({}, state);
      newState.analysis.data = action.payload.data;
      newState.analysis.isLoading = false;
      return newState;
      break;
    }
    case "GET_TRACK_FEATURES_FULFILLED": {
      return { ...state, features: action.payload.data };
      break;
    }
    case "GET_ALL_TRACK_INFO_PENDING": {
      return {...state, isLoading: true }
      break;
    }
    case "GET_ALL_TRACK_INFO_FULFILLED": {
      return {
        ...state,
        info: action.payload[0].data, 
        features: action.payload[1].data,
        analysis: action.payload[2].data,
        isLoading: false
      };
      break;
    }
  }
  return state;
}
