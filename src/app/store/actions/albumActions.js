import * as spotify from 'spotify';

export function getAlbumInfo(token, id){
  return {
    type: "GET_ALBUM_INFO",
    payload: spotify.getAlbumInfo(token, id)
  }
}

export function getAudioFeatures(token, ids){
  return{
    type: "GET_AUDIO_FEATURES",
    payload: spotify.getAudioFeatures(token, ids)
  }
}
