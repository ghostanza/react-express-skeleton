import React from 'react';
import * as spotify from 'spotify';
import { Link } from 'react-router-dom';
import home from '../../assets/img/home_icon_m.png';
import backBtn from '../../assets/img/back_m.png';
import searchX from '../../assets/img/search_2.png';
import search from '../../assets/img/search_icon_m.png';
import logout from '../../assets/img/logout.png';


export default class NavBar extends React.Component {
  logout(e){
    e.preventDefault();
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'refresh=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace('/');
  }
  moveBack(){
    history.back();
  }
  render() {
    return(
      <div className='navigation-bar'>
        <ul className="nav-items">
          <li><Link to="/"><img src={home} id="logo"/></Link></li>
          <li onClick={this.moveBack}><img src={backBtn} /></li>
          <li onClick={this.props.toggleSearch}>
            <img className='search-exit' style={{'display' : this.props.searchActive ? 'block' : 'none' }}src={searchX}/>
            <img className='search-icon' style={{'display' : this.props.searchActive ? 'none' : 'block' }} src={search}/>
          </li>
          <li><img src={logout} onClick={this.logout}/></li>
        </ul>
      </div>
    )
  }
}
