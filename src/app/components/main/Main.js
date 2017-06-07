import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Dashboard from 'pages/Dashboard';
import ArtistPage from 'pages/ArtistPage';
import TrackPage from 'pages/TrackPage';
import GenrePage from 'pages/GenrePage';
import { BrowserRouter } from 'react-router-dom';
export default class Main extends React.Component {
  render() {
    return(
        <BrowserRouter>
          <div className="main-contain">
            <Route exact path='/' component={Dashboard}/>
            <Route path='/artist/:id' component={ArtistPage}/>
            <Route path='/track/:id' component={TrackPage}/>
            <Route path='/genre/:genre' component={GenrePage}/>
          </div>
        </BrowserRouter>
    )
  }
}
