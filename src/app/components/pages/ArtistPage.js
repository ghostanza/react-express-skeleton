import React from 'react';
import { connect } from 'react-redux';
import * as artistActions from 'actions/artistActions'
import ArtistTopTracks from 'page_components/artist/ArtistTopTracks';
import TopTracksOverview from 'page_components/artist/TopTracksOverview';
import ArtistInfo from 'page_components/artist/ArtistInfo';
import InfoList from 'components/main/InfoList';
import ArtistGenres from 'page_components/artist/ArtistGenres';

function mapStateToProps(state, ownProps){
  return {token: state.user.token, artist: state.artist, url_params: ownProps.match.params, ...ownProps}
}

class ArtistPage extends React.Component {
  fetchData(){
    var token = this.props.token,
        artist_id = this.props.url_params.id;
    if((this.props.artist.current_artist_id != artist_id) && token.length){
      this.props.dispatch(artistActions.setCurrentArtist(artist_id));
      this.props.dispatch(artistActions.getAllArtistInfo(token, artist_id));
    }
  }
  componentWillMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps){
    document.querySelector('.artist-contain').scrollIntoView({block: 'start'});
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.fetchData();
    }
  }
  render() {
    return (
      <div className='artist-contain'>
        <div className='contents'>
          { Object.keys(this.props.artist.info).length > 0 ? (<ArtistInfo info={this.props.artist.info} />) : '' }
          <div className='info'>
            { this.props.artist.info.genres ? (<ArtistGenres genres={this.props.artist.info.genres} />) : ''}
            { this.props.artist.related_artists ? (<InfoList items={this.props.artist.related_artists} linksTo='artist' display='pill' heading='Similar Artists' />) : ''}
            { this.props.artist.albums.length > 0 ? (<InfoList items={this.props.artist.albums} linksTo='album' display='images' heading='Albums' unique='true' />) : ''}
            { this.props.artist.albums.length > 0 ? (<InfoList items={this.props.artist.top_tracks} linksTo='track' display='list' hasAudio='1' heading='Top Tracks' unique='true' />) : ''}
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(ArtistPage);
