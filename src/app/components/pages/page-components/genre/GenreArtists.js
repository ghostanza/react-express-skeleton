import React from 'react';
import {Link} from 'react-router-dom';

class GenreArtists extends React.Component {
  constructor(props){
    super(props);
  }
  componenWillReceiveProps(nextProps){
    console.log('test',nextProps);
  }
  render() {
    return (
      <div className="results-container">
        <ul>
          { this.props.artists.map((artist) => {
            return (
              <li key={artist.id} style={{'backgroundImage' : `${artist.images[1].url ? `url(${artist.images[1].url})` : 'none' }`}}>
                <Link to={`/artist/${artist.id}`}>
                  <span className='genre-hover'>{artist.name}</span>
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
