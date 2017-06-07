import React from 'react';
import * as spotify from 'spotify';
import { Link } from 'react-router-dom';

export default class Welcome extends React.Component {
  logout(e){
    e.preventDefault();
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace('/');
  }
  render() {

    return(
      <div className='welcome-bar'>
            <div className='msg-and-controls'>
              <h2 className='welcome-msg'>{`${this.props.name}.`}</h2>
              <span onClick={this.logout}>Log Out</span>
              <Link to="/" className='nav-link'>Home</Link>
            </div>
      </div>
    )
  }
}
