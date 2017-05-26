import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import ArtistPage from '../pages/ArtistPage';
import TrackPage from '../pages/TrackPage';

export default class Main extends React.Component {
  render() {
    return(
      <div className='main-contain'>
        <Switch>
          <Route exact path='/' render={(props) => <Dashboard token={this.props.token} {...props}/>}/>
          <Route path='/artist/:id' render={(props) => <ArtistPage token={this.props.token} {...props}/>}/>
          <Route path='/track/:id' render={(props) => <TrackPage token={this.props.token} {...props}/>}/>
        </Switch>
      </div>
    )
  }
}
