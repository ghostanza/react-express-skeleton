import React from 'react';
import { connect } from 'react-redux';
import { setNewToken } from 'actions/userActions';
import { getOrSetToken } from 'spotify';
import LoginButton from './page-components/dashboard/LoginButton';
import MyTop from './page-components/dashboard/MyTop';
//import CurrentlyPlaying from './page-components/dashboard/CurrentlyPlaying';

function mapStateToProps(state){
  return {
    user: state.user
  }
}

class Dashboard extends React.Component {
  componentWillMount() {
    var token = document.cookie.match(/.*token=([^;]*).*$/) ? document.cookie.replace(/.*token=([^;]*).*$/,"$1") : '';
    if(!token && document.cookie.match(/.*refresh=([^;]*).*$/)){
      getOrSetToken().then((res) => {
        this.props.dispatch(setNewToken(res.data.token));
      });
    }
  }
  render() {
    return(
      <div className='main-dash'>
        { this.props.user.token ? (
          <div>
            <MyTop type={this.props.user.top.current_type}/>
        </div>
        ) : <LoginButton /> }
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard);
