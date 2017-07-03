import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.gif';

export default class InfoList extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    var usedNames = [];
    return(
      <div className={`info-list ${this.props.display ? this.props.display : 'list'}`}>
        <h2>{this.props.heading}</h2>
        <div className='list-wrapper'>
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
