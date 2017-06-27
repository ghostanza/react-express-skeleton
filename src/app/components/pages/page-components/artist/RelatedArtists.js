import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../../assets/img/logo.gif';

export default class RelatedArtists extends React.Component {
  render() {
    return(
      <div className="related-artists">
        <h2>Similar Artists</h2>
        <ul>
        { this.props.artists.map((artist) => {
          return (
            <li key={artist.id}>
              <Link to={`/artist/${artist.id}`}>
                <span>{artist.name}</span>
              </Link>
            </li>
          )
        })}
        </ul>
      </div>
    )
  }
}
