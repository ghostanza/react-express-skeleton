import React from 'react';
import Welcome from '../dashboard/Welcome';
import TopArtists from '../dashboard/TopArtists';
import RecentlyPlayed from '../dashboard/RecentlyPlayed';
import CurrentlyPlaying from '../dashboard/CurrentlyPlaying';

export default class Dashboard extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
        <Welcome token={this.props.token} />
        <div className='main'>
          <TopArtists token={this.props.token} />
          <TopArtists token={this.props.token} range='short_term' />
          <RecentlyPlayed token={this.props.token} />
        </div>
        <CurrentlyPlaying token={this.props.token}/>
      </div>
    )
  }
}
