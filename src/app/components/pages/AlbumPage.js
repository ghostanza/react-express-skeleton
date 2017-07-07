import React from 'react';
import {connect} from 'react-redux';
import * as albumActions from 'actions/albumActions';
import { setNewToken } from 'actions/userActions';
import { getOrSetToken } from 'spotify';
import InfoList from 'components/main/InfoList';
import AlbumSound from 'page_components/album/AlbumSound';
import AlbumInfoHeader from 'page_components/album/AlbumInfoHeader';

function mapStateToProps(state, ownProps){
  return {token: state.user.token, artist: state.artist, album: state.album, url_params: ownProps.match.params, ...ownProps}
}

class AlbumPage extends React.Component {
  fetchData(){
    var token = document.cookie.match(/.*token=([^;]*).*$/) ? document.cookie.replace(/.*token=([^;]*).*$/,"$1") : '',
        album_id = this.props.url_params.id;
    if(album_id && token){
      this.props.dispatch(albumActions.getAlbumInfo(token, album_id)).then(
      (res)=>{
        if(res.action.payload.data && res.action.payload.data.tracks.items.length){
          this.props.dispatch(
            albumActions.getAudioFeatures(token, res.action.payload.data.tracks.items.map((i) => { return i.id }))
          )
        }
      });
    }
    else if(!token && document.cookie.match(/.*refresh=([^;]*).*$/)){
      getOrSetToken().then((res) => {
        this.props.dispatch(setNewToken(res.data.token));
        this.props.dispatch(albumActions.getAlbumInfo(res.data.token, album_id)).then(
        (res)=>{
          if(res.action.payload.data && res.action.payload.data.tracks.items.length){
            this.props.dispatch(
              albumActions.getAudioFeatures(token, res.action.payload.data.tracks.items.map((i) => { return i.id }))
            )
          }
        });
      });
    }
  }
  componentWillMount(){
    this.fetchData();
    document.querySelectorAll('.album-page-contain')[0] && document.querySelectorAll('.album-page-contain')[0].scrollIntoView({block: 'start'});
  }
  componentDidUpdate(){
    document.querySelector('.album-page-contain') && document.querySelector('.album-page-contain').scrollIntoView({block: 'start'});
  }
  render() {
    return(
      <div className='album-page-contain'>
        {Object.keys(this.props.album.info).length ? (<AlbumInfoHeader info={this.props.album.info}/>) : ''}
        {Object.keys(this.props.album.stats_avg).length ? (<AlbumSound stats={this.props.album.stats_avg}/>) : '' }
        {this.props.album.tracks.length  ? (<InfoList items={this.props.album.tracks} heading="Tracks" hasAudio='1'/>) : ''}
      </div>
    )
  }
}

export default connect(mapStateToProps)(AlbumPage);
