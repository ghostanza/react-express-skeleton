import React from 'react';
import {getCurrentlyPlaying} from 'spotify';

export default class CurrentlyPlaying extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentTrack: {}
    }
  }
  componentDidMount(){
    getCurrentlyPlaying(this.props.token).then((res) => {
      console.log(res.data);
      this.setState(prevState => ( (res.data && res.data!=prevState) ? {currentTrack: res.data } : prevState ));
    })
    setInterval(function(){
      getCurrentlyPlaying(this.props.token).then((res) => {
        console.log(res);
        this.setState(prevState => ( res.data ? {currentTrack: res.data } : preState ));
      })
    }.bind(this), 5000 );
  }
  render() {
    return(
      <div>
        {
          this.state.currentTrack.is_playing ? (
            <div className='currently-playing-wrap'>
              <p>Currently Playing: </p>
                    <div className='currently-playing'>
                      { this.state.currentTrack.item.album.images[2] ? (
                        <img src={this.state.currentTrack.item.album.images[2].url}></img>
                      ) : ''}
                      <p>{this.state.currentTrack.item.name}<br/><span className='current-artist'>{this.state.currentTrack.item.artists[0].name}</span></p>
                    </div>
            </div>
              ) : ''
          }
      </div>
    )
  }
}
