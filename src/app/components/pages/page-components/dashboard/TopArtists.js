import React from 'react';
import {connect} from 'react-redux';
// import {getTop} from 'spotify';
import {Link} from 'react-router-dom';
import * as actions from 'actions/userActions';

function mapStateToProps(state){
  return {...state}
}

class TopArtists extends React.Component {
  changeRange(e){
    var range = e.target.value;

    this.props.dispatch(actions.changeTopArtistRange(range));
    if( this.props.user.token && !this.props.user.topArtists[range].length ){
      this.props.dispatch(actions.getTopArtists(this.props.user.token, { limit: 10, time_range: range }))
    }
  }
  componentDidMount(){
    if( this.props.user.token && !this.props.user.topArtists[this.props.user.topArtists.current_range].length ){
      this.props.dispatch(actions.getTopArtists(this.props.user.token, { limit: 10, time_range: this.props.user.topArtists.current_range }))
    }
  }
  /*
  render() {
    return(
      <div className="topArtists dash-block">
        <h2>{this.state.topArtists ? `Top 10 Artists` : 'Loading top artists...'}</h2>
        <div className="select-wrapper">
          <select onChange={this.changeRange.bind(this)} value={this.state.range}>
            <option value="long_term">All Time</option>
            <option value="medium_term">6 Months</option>
            <option value="short_term">Recent</option>
          </select>
        </div>
        <ul>
          {
            this.state.topArtists[this.state.range].map((artist) => {
              return <li key={artist.id}><Link to={`/artist/${artist.id}`}>{artist.name}</Link></li>
            })
          }
        </ul>
      </div>
    )
  }
  */
  render() {
    console.log('top-artsts', this.props)
    return(
      <div className="topArtists dash-block">
        <h2>{this.props.user.topArtists[this.props.user.topArtists.current_range] ? `Top 10 Artists` : `Loading top artists...`}</h2>
          <div className="select-wrapper">
            <select onChange={this.changeRange.bind(this)} value={this.props.user.topArtists.current_range}>
              <option value="long_term">All Time</option>
              <option value="medium_term">6 Months</option>
              <option value="short_term">Recent</option>
            </select>
          </div>
          <ul>
            {
              this.props.user.topArtists[this.props.user.topArtists.current_range].map((artist) => {
                return <li key={artist.id}><Link to={`/artist/${artist.id}`}>{artist.name}</Link></li>
              })
            }
          </ul>
      </div>
    )
  }
}

export default connect(mapStateToProps)(TopArtists);
