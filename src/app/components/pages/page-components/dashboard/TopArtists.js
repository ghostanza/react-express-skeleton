import React from 'react';
import {getTop} from 'spotify';
import {Link} from 'react-router-dom';

export default class TopArtists extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      range: this.props.range ? this.props.range : 'long_term',
      topArtists: {
        // all time
        long_term: [],
        // 6 months
        medium_term: [],
        // 4 weeks
        short_term:[]
      }
    }
  }
  changeRange(e){
    var range = e.target.value,
        newRange = e.target.value === this.state.range ? this.state.range : e.target.value;
    this.setState({range: newRange});
    // If there is no data yet, fetch it
    if(!this.state.topArtists[range].length > 0){
      getTop(this.props.token, 'artists', {limit: 10, time_range: range})
        .then((res) => {
          var nextState = Object.assign({}, this.state);
          nextState.topArtists[range] = res.data.items;
          this.setState( prevState => (nextState));
        })
    }
  }
  componentDidMount(){
    getTop(this.props.token, 'artists', {limit: 10, time_range: this.state.range})
      .then((res) => {
        var nextState = Object.assign({}, this.state);
        nextState.topArtists[this.state.range] = res.data.items;
        this.setState(prevState => (nextState));
      });
  }
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
}
