import React from 'react';
import {Link} from 'react-router-dom';

export default class AlbumInfoHeader extends React.Component {
  render() {
    return(
      <div className="album-info-header">
        {this.props.info.images && this.props.info.images.length > 1 ? (
          <img src={this.props.info.images[1].url}/>
        ) : ''}
        {this.props.info.artists && this.props.info.artists.length ? (<h3 className="album-artist"><Link to={`/artist/${this.props.info.artists[0].id}`}>{this.props.info.artists[0].name}</Link></h3>) : ''}
        {this.props.info.label ? (<h3 className="album-label"><Link to={`/search/label/${this.props.info.label}`}>{this.props.info.label}</Link></h3>):''}
        {this.props.info.name ? (<h2 className="album-name">{this.props.info.name}</h2>) : ''}
      </div>
    )
  }
}
