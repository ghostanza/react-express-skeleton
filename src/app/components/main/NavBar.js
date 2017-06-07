import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: 'Search'
    }
  }
  handleInput(e){
    this.setState({ searchTerm: e.target.value });
  }
  clicked(e){
    this.setState({searchTerm: ''});
  }
  render() {
      return(
        <div className='nav-bar'>
            <p>REDIRECT: {this.state.redirect}</p>
              <input type='text' placeholder='search for artist or album' onChange={this.handleInput.bind(this)}></input>
              <Link to={`/search/${this.state.searchTerm}`} onClick={this.clicked.bind(this)}>Search</Link>
        </div>
      )
  }
}
