import React from 'react';

export default class ArtistAlbums extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    var usedNames = [];
    return(
      <div className='albums-container dash-block'>
        <ul className='album-row'>
        {this.props.albums.map( (album) => {
          if(usedNames.indexOf(album.name) >= 0){
            return '' }
          else{
            usedNames.push(album.name);
            return(
              <li className='album' key={album.id}>
                <span>{album.name}</span>
                <img src={album.images[1].url}/>
              </li>
            )
          }
        })}
        </ul>
      </div>
    )
  }
}
