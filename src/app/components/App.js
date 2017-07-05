import React from 'react';
import Navigation from './main/Navigation';
import {Route, Switch} from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import ArtistPage from 'pages/ArtistPage';
import TrackPage from 'pages/TrackPage';
import SearchPage from 'pages/SearchPage';
import AlbumPage from 'pages/AlbumPage';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserInfo } from 'actions/userActions';

function mapStateToProps(state, ownProps){
  return { ...state, ...ownProps}
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
            <Route path='/album/:id' component={AlbumPage}/>
            <Route path='/search/:type/:query' component={SearchPage}/>
          </div>
          <Navigation name={this.props.user.info.id}/>
        </div>
      </BrowserRouter>
    )
  }
}

export default connect(mapStateToProps)(App);
