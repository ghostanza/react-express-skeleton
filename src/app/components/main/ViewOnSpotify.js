import React from 'react';
export default class ViewOnSpotify extends React.Component {
  render() {
    return(
      <div className="view-on-spotify">
        <a href={this.props.link} target="_blank">View On Spotify</a>
      </div>
    )
  }
}
