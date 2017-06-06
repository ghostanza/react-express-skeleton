import React from 'react';
import * as spotify from 'spotify';

export default class Welcome extends React.Component {
  /*
  constructor(props){
    super(props);
    this.state = {
      userData: {}
    }
  }
  componentDidMount(){
    spotify.getUserInfo(this.props.token).then( (userData) => {
      userData.data && this.setState({ userData: userData.data });
    });
  }*/
  logout(e){
    e.preventDefault();
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace('/');
  }
  render() {

    return(
      <div className='welcome-bar'>
            <div className='msg-and-controls'>
              <h2 className='welcome-msg'>{`${this.props.name}'s dashboard.`}</h2>
              <span onClick={this.logout}>Log Out</span>
            </div>
      </div>
    )
  }
}
