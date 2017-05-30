import React from 'react';

export default class TopTracksOverview extends React.Component {
  computeInfo(infoArray){
    var values = {
      // 0 - 1: how how suitable for dancing it is
      'dance': 0,
      // 0 - 1: energetic = loud, fast, noisy
      'energy': 0,
      // 0 - 1: how much talking is in it
      'spoken word': 0,
      // 0 - 1: confidence level of whether the song is acoustic
      'acoustic': 0,
      // 0 - 1: predicts whether a track has no vocals // confidence level
      'instrumental': 0,
      // 0 - 1: how positive the song is -- high = happy, low = sad
      'cheeriness': 0,
      // estimated tempo of the track in BPM
      'tempo': 0
    };
    if(infoArray){
      var tracks = infoArray;
      for(var i = 0; i < tracks.length; i++){
        values.dance += tracks[i].danceability;
        values.energy += tracks[i].energy;
        values['spoken word'] += tracks[i].speechiness;
        values.acoustic += tracks[i].acousticness;
        values.instrumental += tracks[i].instrumentalness;
        values.cheeriness += tracks[i].valence;
      }
      values = {
        'dance': Math.floor((values.dance/tracks.length) * 100),
        'energy': Math.floor((values.energy/tracks.length)*100),
        'spoken word': Math.floor((values['spoken word']/tracks.length)*100),
        'acoustic': Math.floor((values.acoustic/tracks.length)*100),
        'instrumental': Math.floor((values.instrumental/tracks.length)*100),
        //'liveness': Math.floor((values.liveness/tracks.length)*100),
        'cheeriness': Math.floor((values.cheeriness/tracks.length)*100),
        //'tempo': (values.tempo/tracks.length),
      };
    }
    return values;
  }
  render() {
    var data = this.computeInfo(this.props.audioFeatures);
    return(
      <div className="overview dash-block">
        <h2>Artist Scorecard</h2>
        <ul>
          { Object.keys(data).map((keyname) => {
            return <li key={`${keyname}-${data[keyname]}`} data={data[keyname]}>{keyname}: <span className='artist-score'>{data[keyname]}/100</span></li>
          }) }
        </ul>
      </div>
    )
  }
}
