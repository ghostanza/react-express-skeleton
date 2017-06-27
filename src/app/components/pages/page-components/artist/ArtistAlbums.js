import React from 'react';
import {Link} from 'react-router-dom';

export default class ArtistAlbums extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    var usedNames = [];
    return(
      <div className='artist-albums'>
        <h2>Albums</h2>
        <ul>
        {this.props.albums.map( (album) => {
          if(usedNames.indexOf(album.name) >= 0){
            return '' }
          else{
            usedNames.push(album.name);
            return(
              <li key={album.id} style={{'backgroundImage' : album.images.length >= 2 && album.images[1].url ? (`url(${album.images[1].url})`) : (`url(/${logo})`)}}>
                <Link to={`/album/${album.id}`}>
                  <span className='genre-hover'>{album.name}</span>
                </Link>
              </li>
            )
          }
        })}
        </ul>
      </div>
    )
  }
}
