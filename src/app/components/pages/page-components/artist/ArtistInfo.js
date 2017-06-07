import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className='genre-block'>
          <ul>
            {
              this.props.info.genres.length ? (
                this.props.info.genres.map((genre)=>{
                  return <li key={genre}><Link to={`/genre/${genre}`}>{genre}</Link></li>
                })
              ) : ''
            }
          </ul>
        </div>
      </div>
    )
  }
}
