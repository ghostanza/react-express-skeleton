import React from 'react';
import { Link } from 'react-router-dom';

export default class ArtistGenres extends React.Component {
  render() {
    return(
      <div className='genre-block'>
        <ul>
          {
            this.props.genres.length ? (
              this.props.genres.map((genre)=>{
                return <li key={genre}><Link to={`/search/genre/${genre}`}>{genre}</Link></li>
              })
            ) : ''
          }
        </ul>
      </div>
    )
  }
}
