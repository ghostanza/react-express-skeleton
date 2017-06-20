import React from 'react';
import * as spotify from 'spotify';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.gif';
import backBtn from '../../assets/img/back.png';
import searchX from '../../assets/img/search_2.png';
import search from '../../assets/img/search_1_bk.png';
import logout from '../../assets/img/logout.png';


export default class NavBar extends React.Component {
  logout(e){
    e.preventDefault();
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace('/');
  }
  moveBack(){
    history.back();
  }
  render() {
    return(
      <div className='navigation-bar'>
        <ul className="nav-items">
          <li><Link to="/"><img src={logo} id="logo"/></Link></li>
          <li onClick={this.moveBack}><img src={backBtn} /></li>
          <li onClick={this.props.toggleSearch}>
            <img className='search-exit' style={{'display' : this.props.searchActive ? 'block' : 'none' }}src={searchX}/>
            <img className='search-icon' style={{'display' : this.props.searchActive ? 'none' : 'block' }} src={search}/>
          </li>
          <li onClick={this.logout}><img src={logout}/></li>
        </ul>
      </div>
    )
  }
}
