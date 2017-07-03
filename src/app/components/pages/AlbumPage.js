import React from 'react';
import {connect} from 'react-redux';
import * as albumActions from 'actions/albumActions';
import InfoList from 'components/main/InfoList';

function mapStateToProps(state, ownProps){
  return {token: state.user.token, artist: state.artist, album: state.album, url_params: ownProps.match.params, ...ownProps}
}

class AlbumPage extends React.Component {
  fetchData(){
    var token = this.props.token,
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
  }
  componentWillMount(){
    this.fetchData();
  }
  render() {
    console.log(this.props);
    return(
      <div>
        {this.props.album.tracks.length  ? (<InfoList items={this.props.album.tracks} heading="Tracks" linksTo="track"/>) : ''}
      </div>
    )
  }
}

export default connect(mapStateToProps)(AlbumPage);
