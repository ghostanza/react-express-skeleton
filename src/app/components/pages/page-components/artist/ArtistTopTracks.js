import React from 'react';

export default class ArtistTopTracks extends React.Component {
  render() {
    return(
      <div className='topTracks dash-block'>
        <h2>Top Tracks</h2>
        {this.props.topTracks ? (
          <ul>
            { this.props.topTracks.map((track) => {
              return <li key={track.id}>{track.name}</li>
            })}
          </ul>
        ): ''}
      </div>
    )
  }
}
