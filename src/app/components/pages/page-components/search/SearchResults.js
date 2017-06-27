import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../../../assets/img/logo.gif';

class SearchResults extends React.Component {
  render() {
    var type = this.props.type.replace(/s$/,'');
    if(type === 'genre'){
      type = 'artist';
    }
    return (
      <div className="results-container">
        <ul className={type}>
          { this.props.results.map((result) => {
            return (
              <li key={result.id}style={{'backgroundImage' : result.images.length >= 2 && result.images[1].url ? (`url(${result.images[1].url})`) : (`url(/${logo})`)}}>
                <Link to={`/${type}/${result.id}`}>
                  <span className='genre-hover'>{result.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }

}

export default SearchResults;
