import React from 'react';
import { connect } from 'react-redux';
import LoginButton from './page-components/dashboard/LoginButton';
import TopArtists from './page-components/dashboard/TopArtists';
import RecentlyPlayed from './page-components/dashboard/RecentlyPlayed';
import CurrentlyPlaying from './page-components/dashboard/CurrentlyPlaying';
import {Link} from 'react-router-dom';

function mapStateToProps(state){
  return {
    user: state.user
  }
}

class Dashboard extends React.Component {
  render() {
    return(
      <div className='main-dash'>
        { this.props.user.token ? (
          <div>
            <TopArtists />
            <RecentlyPlayed token={this.props.user.token} />
        </div>
        ) : <LoginButton /> }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard);
/*<RecentlyPlayed token={this.props.token} />
<CurrentlyPlaying token={this.props.token}/>*/
