import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/trackActions';
import Loader from 'components/main/Loader';

function mapStateToProps(state, ownProps){
  return {
    ...ownProps,
    token: state.user.token,
    track: state.track,
    url_params: ownProps.match.params
  }
}

class TrackPage extends React.Component {
  componentWillMount(){
    var track_id = this.props.url_params.id,
        token = this.props.token;
    if(token && this.props.track.current_track_id != track_id ){
      this.props.dispatch(actions.setTrackId(track_id));
      this.props.dispatch(actions.getAllTrackInfo(token, track_id));
    }
  }
  render() {
    return(
      <div className='track-contain'>
        { this.props.track.isLoading ? (<Loader />) : 'got the data'}
      </div>
    )
  }
}

export default connect(mapStateToProps)(TrackPage);
