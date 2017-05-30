import React from 'react';
import LoginButton from './page-components/dashboard/LoginButton';
import TopArtists from './page-components/dashboard/TopArtists';
import RecentlyPlayed from './page-components/dashboard/RecentlyPlayed';
import CurrentlyPlaying from './page-components/dashboard/CurrentlyPlaying';
import {Link} from 'react-router-dom';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      token: this.props.token
    }
  }
  render() {
    return(
      <div className='main-dash'>
        { this.state.token ? (
          <div>
            <TopArtists token={this.state.token} />
            <RecentlyPlayed token={this.state.token} />
          <CurrentlyPlaying token={this.state.token}/>
        </div>
        ) : <LoginButton /> }
      </div>
    )
  }
}
