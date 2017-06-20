import React from 'react';
import * as spotify from 'spotify';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  logout(e){
    e.preventDefault();
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace('/');
  }

  render() {
    return(
      <div className='navigation-bar'>
        <ul className="nav-items">
          <li><Link to="/"><img src={require('../../assets/img/logo.gif')} id="logo"/></Link></li>
          <li onClick={this.props.toggleSearch}>{ this.props.searchActive ? (<img src={require('../../assets/img/search_2.png')}/>) : (<img src={require('../../assets/img/search_1_bk.png')}/>)}</li>
          <li onClick={this.logout}><img src={require('../../assets/img/logout.png')}/></li>
        </ul>
      </div>
    )
  }
}
