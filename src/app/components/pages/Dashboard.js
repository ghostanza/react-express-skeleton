import React from 'react';
import { connect } from 'react-redux';
import LoginButton from './page-components/dashboard/LoginButton';
import MyTop from './page-components/dashboard/MyTop';
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
            <MyTop type='artists'/>
            <MyTop type='tracks'/>
        </div>
        ) : <LoginButton /> }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard);
/*<RecentlyPlayed token={this.props.token} />
<CurrentlyPlaying token={this.props.token}/>*/
