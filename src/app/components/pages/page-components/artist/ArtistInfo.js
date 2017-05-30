import React from 'react';

export default class ArtistInfo extends React.Component {
  render() {
    return(
      <div>
        { this.props.info.images[0] ? (
          <div className='artist-img' style={{backgroundImage: `url(${this.props.info.images[0].url})`}}>
          </div>
        ) : ''}
        { this.props.info.name ? (
          <h1>{this.props.info.name}</h1>
        ) : ''}
      </div>
    )
  }
}
