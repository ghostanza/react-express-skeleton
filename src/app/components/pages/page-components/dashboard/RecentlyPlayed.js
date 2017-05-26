import React from 'react';
import {getRecentlyPlayed} from 'spotify';

export default class RecentlyPlayed extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      recentlyPlayed: []
    }
  }
  componentDidMount(){
    getRecentlyPlayed(this.props.token, {limit: 10}).then((res) => {
      this.setState(prevState => ( res.data.items ? {recentlyPlayed: [...prevState.recentlyPlayed,...res.data.items]} : recentlyPlayed ));
    });
  }
  render() {
    return(
      <div className="recentlyPlayed dash-block">
        <h2>{this.state.recentlyPlayed ? 'Recently Played' : 'Loading recent tracks...'}</h2>
        <ul>
          {
            this.state.recentlyPlayed.map((track) => {
              return <li key={track.played_at}>{track.track.name} - {track.track.artists[0].name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
