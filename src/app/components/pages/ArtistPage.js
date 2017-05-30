import React from 'react';
import {getArtists, getArtistTopTracks, getAudioFeatures, getArtistAlbums} from 'spotify';
import ArtistTopTracks from './page-components/artist/ArtistTopTracks';
import TopTracksOverview from './page-components/artist/TopTracksOverview';
import ArtistInfo from './page-components/artist/ArtistInfo';
import ArtistAlbums from './page-components/artist/ArtistAlbums';

export default class Other extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      artistInfo: {},
      topTracks: [],
      trackInfo: [],
      albums: [],
    }
  }
  componentDidMount(){
    // get the artist information
    getArtists(this.props.token, this.props.match.params.id)
      .then((res)=>{
      this.setState( (prevState) => ({artistInfo : res.data }) );
      // then get the artist's top tracks
      return getArtistTopTracks(this.props.token, this.props.match.params.id);
    })
      .then((res) => {
        var ids = res.data.tracks.map((t) => { return t.id });
        this.setState( (prevState) => ({ topTracks : res.data.tracks }) );
        // then get the audio features for the top tracks
        return getAudioFeatures(this.props.token, ids);
    })
      .then((res) => {
        this.setState( (prevState) => ({ trackInfo : res.data.audio_features }));
        return getArtistAlbums(this.props.token, this.props.match.params.id, {album_type: 'album', limit: 50});
    })
      .then((res)=>{
        console.log(res.data);
        this.setState( (prevState) => ({albums: res.data.items}))
      });
  }
  render() {
    console.log(this.state);
    return(
      <div className='artist-contain'>
        <div className='contents'>
          { Object.keys(this.state.artistInfo).length > 0 ? (<ArtistInfo info={this.state.artistInfo} />) : '' }
          <div className='info'>
            { this.state.albums.length > 0 ? (<ArtistAlbums albums={this.state.albums} />) : ''}
            { this.state.trackInfo.length > 0 ? (<TopTracksOverview audioFeatures={this.state.trackInfo} />) : '' }
          </div>
        </div>
      </div>
    )
  }
}
