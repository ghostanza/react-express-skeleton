import React from 'react';
var spotify = require('../helpers/spotify');

export default class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      albums: []
    }
  }
  componentDidMount(){
    spotify.getAlbums('41MnTivkwTO3UUJ8DrqEJJ').then((res) => {
      this.setState(prevState => ( res.data.albums ? {albums: [...prevState.albums,...res.data.albums]} : {albums : [...prevState.albums, res.data]} ));
    });
  }
  render() {
    return(
      <ul>
        {
          this.state.albums.map((album) => {
            return <li key={album.uri}>{album.name}</li>
          })
        }
      </ul>
    )
  }
}
