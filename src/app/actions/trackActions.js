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
export function getTrackInfo(token, id){
  return {
    type: "GET_TRACK_INFO",
    payload: spotify.getTrackInfo(token, id)
  }
}
export function setTrackId(trackId){
  return {
    type: "SET_CURRENT_TRACK_ID",
    trackId
  }
}
export function getAllTrackInfo(token, id){
  return {
    type: "GET_ALL_TRACK_INFO",
    payload: spotify.getAllTrackInfo(token, id)
  }
}
