export default function reducer(state={
  info: {},
  indiv_stats: [],
  stats_avg: {},
  tracks: [],
  isLoading: false,
}, action){
  switch(action.type){
    case 'GET_ALBUM_INFO_FULFILLED':{
      return { ...state, info: action.payload.data, tracks: action.payload.data.tracks.items };
      break;
    }
    case 'GET_AUDIO_FEATURES_FULFILLED': {
      if(action.payload.data.audio_features){
        var all_stats = action.payload.data.audio_features,
            total = action.payload.data.audio_features.length,
            stats_avg = {};
        all_stats.forEach((stats) => {
          for(var stat in stats){
            if(!isNaN(stats[stat])){
              stats_avg[stat] ? stats_avg[stat]+=stats[stat] : stats_avg[stat]=stats[stat];
            }
          }
        });
        for(var avg in stats_avg){
          stats_avg[avg] = parseFloat((stats_avg[avg]/total).toFixed(2));
        }
        return { ...state, indiv_stats: action.payload.data.audio_features, stats_avg }
      }
      else{
        return state;
      }
    }
  }
  return state;
}
