import React from 'react';
import Navigation from './main/Navigation';
import {Route, Switch} from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import ArtistPage from 'pages/ArtistPage';
import TrackPage from 'pages/TrackPage';
import GenrePage from 'pages/GenrePage';
import SearchPage from 'pages/SearchPage';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/userActions';

function mapStateToProps(state){
  return { ...state }
}

class App extends React.Component {
  componentWillMount(){
    if(this.props.user.token){
      this.props.dispatch(getUserInfo(this.props.user.token));
    }
  }
  render() {
    if(localStorage){localStorage.setItem('appUserState', JSON.stringify(this.props.user))}
    return(
      <BrowserRouter>
        <div className="outer">
          <div className='main-contain'>
            <Route exact path='/' component={Dashboard}/>
            <Route path='/artist/:id' component={ArtistPage}/>
            <Route path='/track/:id' component={TrackPage}/>
            <Route path='/genre/:genre' component={GenrePage}/>
            <Route path='/search/:type/:query' component={SearchPage}/>
          </div>
          <Navigation name={this.props.user.info.id}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps)(App);
