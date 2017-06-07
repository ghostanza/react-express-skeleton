import React from 'react';
import {Link} from 'react-router-dom';

class GenreArtists extends React.Component {
  render() {
    return (
      <div>
        <ul>
          { this.props.artists.map((artist) => {
            return (
              <li key={artist.id}>
                <Link to={`/artist/${artist.id}`}>
                  <span className='genre-hover'>{artist.name}</span>
                  <img src={artist.images[1] ? artist.images[1].url : artist.images[0].url}/>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default GenreArtists;
