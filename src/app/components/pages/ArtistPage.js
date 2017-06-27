import React from 'react';
import { connect } from 'react-redux';
import * as artistActions from 'actions/artistActions'
import ArtistTopTracks from 'page_components/artist/ArtistTopTracks';
import TopTracksOverview from 'page_components/artist/TopTracksOverview';
import ArtistInfo from 'page_components/artist/ArtistInfo';
import ArtistAlbums from 'page_components/artist/ArtistAlbums';
import ArtistGenres from 'page_components/artist/ArtistGenres';

function mapStateToProps(state, ownProps){
  return {token: state.user.token, artist: state.artist, url_params: ownProps.match.params}
}

class ArtistPage extends React.Component {
  componentWillMount(){
    var token = this.props.token,
        artist_id = this.props.url_params.id;
    if((this.props.artist.current_artist_id != artist_id) && token.length){
        this.props.dispatch(artistActions.setCurrentArtist(artist_id));
        this.props.dispatch(artistActions.getAllArtistInfo(token, artist_id));
    }
  }
  render() {
    console.log(this.props.artist.info.genres);
    return (
      <div className='artist-contain'>
        <div className='contents'>
          { Object.keys(this.props.artist.info).length > 0 ? (<ArtistInfo info={this.props.artist.info} />) : '' }
          <div className='info'>
            { this.props.artist.info.genres ? (<ArtistGenres genres={this.props.artist.info.genres} />) : ''}
            { this.props.artist.albums.length > 0 ? (<ArtistAlbums albums={this.props.artist.albums} />) : ''}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(ArtistPage);
