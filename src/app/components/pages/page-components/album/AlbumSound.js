import React from 'react';

export default class AlbumSound extends React.Component {
  render() {
    var translate = {
      'danceability' : 'danceability',
      'energy' : 'energy',
      'speechiness' : 'spoken word',
      'acousticness' : 'acoustic',
      'instrumentalness' : 'instrumental',
      'liveness' : 'live sound',
      'valence' : 'positivity'
    }
    return(
      <div className="sound-overview">
        <h2>{this.props.heading ? this.props.heading : "Overview"}</h2>
        <ul>
          {
            Object.keys(this.props.stats).length ?
              (Object.keys(this.props.stats).map(
                (stat) => {
                  if(this.props.stats[stat] > 0 && this.props.stats[stat] < 1 && stat !== 'mode'){
                    return(
                      <li key={stat}>
                        <span className="stat-name">{translate[stat]}</span>
                        <div className="stat-bar" style={{width: `${this.props.stats[stat] * 100}%`}}><span className='stat-val-text'>{this.props.stats[stat] * 100}%</span></div>
                      </li>
                    )
                  }
                }
            )) : ''
          }
        </ul>
      </div>
    )
  }
}
