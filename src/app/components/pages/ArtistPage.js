import React from 'react';
import {getArtists, getArtistTopTracks, getAudioFeatures} from 'spotify';
import ArtistTopTracks from './page-components/artist/ArtistTopTracks';
import TopTracksOverview from './page-components/artist/TopTracksOverview';
import ArtistInfo from './page-components/artist/ArtistInfo';

export default class Other extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      artistInfo: {},
      topTracks: [],
      trackInfo: []
    }
  }
  componentDidMount(){
    // get the artist information
    getArtists(this.props.match.params.id)
      .then((res)=>{
      this.setState( (prevState) => ({artistInfo : res.data }) );
      // then get the artist's top tracks
      return getArtistTopTracks(this.props.match.params.id);
    })
      .then((res) => {
        var ids = res.data.tracks.map((t) => { return t.id });
        this.setState( (prevState) => ({ topTracks : res.data.tracks }) );
        // then get the audio features for the top tracks
        return getAudioFeatures(this.props.token, ids);
    })
      .then((res) => {
        this.setState( (prevState) => ({ trackInfo : res.data.audio_features }));
    });
  }
  render() {
    //console.log(this.state);
    return(
      <div className='artist-contain'>
        <div className='contents'>
          { Object.keys(this.state.artistInfo).length > 0 ? (<ArtistInfo info={this.state.artistInfo} />) : '' }
          <div className='track-info'>
            { this.state.topTracks.length > 0 ? (<ArtistTopTracks topTracks={this.state.topTracks} />) : ''}
            { this.state.trackInfo.length > 0 ? (<TopTracksOverview audioFeatures={this.state.trackInfo} />) : '' }
          </div>
        </div>
      </div>
    )
  }
}
