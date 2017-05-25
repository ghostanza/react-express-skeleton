import React from 'react';
import {getTop} from 'spotify';

export default class TopArtists extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      topArtists: []
    }
  }
  componentDidMount(){
    getTop(this.props.token, 'artists', {limit: 10, time_range: this.props.range ? this.props.range : 'long_term'})
      .then((res) => {
        console.log(res);
        this.setState(prevState => ( res.data.items ? {topArtists: [...prevState.topArtists,...res.data.items]} : prevState ));
      });
  }
  render() {
    return(
      <div className="topArtists dash-block">
        <h2>{this.state.topArtists ? `Top 10 Artists (${this.props.range === 'medium_term' ? '6mo' : this.props.range === 'short_term' ? 'Recent' : 'All Time'})` : 'Loading top artists...'}</h2>
        <ul>
          {
            this.state.topArtists.map((artist) => {
              return <li key={artist.id}>{artist.name}</li>
            })
          }
        </ul>
      </div>
    )
  }
}
