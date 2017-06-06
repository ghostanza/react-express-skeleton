import * as spotify from 'spotify';

export function getTrackAnalysis(token, id){
  return {
    type: "GET_TRACK_ANALYSIS",
    payload: spotify.getAudioAnalysis(token, id)
  }
}

export function getTrackFeatures(token, id){
  return {
    type: "GET_TRACK_FEATURES",
    payload: spotify.getAudioFeatures(token, id)
  }
}

export function setTrackId(trackId){
  return {
    type: "SET_CURRENT_TRACK_ID",
    trackId
  }
}
