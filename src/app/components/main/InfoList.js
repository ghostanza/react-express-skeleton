import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.gif';

export default class InfoList extends React.Component {
  constructor(props){
    super(props)
  }
  playAudio(e){
    var player = document.getElementById('player'),
        playing = document.querySelectorAll('.playing');
    if(e.target.classList.contains('playing')){
      player.pause();
      e.target.classList.remove('playing');
    }
    else{
      player.src=e.target.getAttribute('data-clip');
      playing.forEach((i)=>{
        i.classList.remove('playing');
      })
      e.target.classList.toggle('playing');
      player.play();
    }
  }
  playerDone(){
    var playing = document.querySelectorAll('.playing');
    playing.forEach((i) => {
      i.classList.remove('playing');
    })
  }
  render() {
    var usedNames = [],
        player = document.getElementById('player');
    if(player){
      player.addEventListener('ended', this.playerDone);
    }
    return(
      <div className={`info-list ${this.props.display ? this.props.display : 'list'} ${this.props.hasAudio ? 'has-audio' : ''}`}>
        <h2>{this.props.heading}</h2>
        <div className='list-wrapper'>
          {this.props.hasAudio ? (<audio controls id='player'></audio>) : ''}
          <ul>
          {this.props.items.map( (item) => {
            if(this.props.unique && usedNames.indexOf(item.name) >= 0){
              return '' }
            else{
              if(this.props.unique){usedNames.push(item.name);}
              if(this.props.display === 'images'){
                return(
                  <li key={item.id}>
                    {this.props.linksTo ? (
                      <div><div className='image-container'><Link to={`/${this.props.linksTo}/${item.id}`}>
                        <img src={ item.images.length >= 2 && item.images[1].url ? (item.images[1].url) : (logo) }/>
                      </Link></div><span>{item.name}</span></div> ) : (<div><img src={ item.images.length >= 2 && item.images[1].url ? (item.images[1].url) : (logo) }/>
                      <span>{item.name}</span></div>)
                    }
                  </li>
                )
              }
              else {
                return(
                <li key={item.id}>
                  { this.props.hasAudio && item.preview_url ? (<div className='audio' onClick={this.playAudio} data-clip={item.preview_url}></div>): ''}
                  {this.props.linksTo ? (
                    <Link to={`/${this.props.linksTo}/${item.id}`}>
                      <span>{item.name}</span>
                    </Link> ) : (<span>{item.name}</span>)
                  }
                </li>
              )
            }
            }
          })}
          </ul>
        </div>
      </div>
    )
  }
}
