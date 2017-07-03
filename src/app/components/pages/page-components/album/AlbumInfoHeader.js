import React from 'react';
import {Link} from 'react-router-dom';

export default class AlbumInfoHeader extends React.Component {
  render() {
    return(
      <div className="album-info-header">
        {this.props.info.images && this.props.info.images.length > 1 ? (
          <img src={this.props.info.images[1].url}/>
        ) : ''}
        <h3 className="album-artist">{this.props.info.artists && this.props.info.artists.length ? (<Link to={`/artist/${this.props.info.artists[0].id}`}>{this.props.info.artists[0].name}</Link>) : ''}</h3>
        <h2 className="album-name">{this.props.info.name ? this.props.info.name : ''}</h2>
      </div>
    )
  }
}
