import React from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchTerm: ''
    }
  }
  handleInput(e){
    this.setState({ searchTerm: e.target.value });
  }
  handleSubmit(e){
    var search_box = document.getElementById('search-box');
    e.preventDefault();
    this.props.history.push(`/search/${this.state.searchTerm}`);
    this.setState({searchTerm: ''});
    search_box.value='';
    search_box.blur();
  }
  render() {
      return(
        <div className='search-bar'>
          <form onSubmit={this.handleSubmit.bind(this)}>
              <input id="search-box" type='text' placeholder='search for artist or album' onChange={this.handleInput.bind(this)}></input>
              <button type='submit' className='search-btn'>Search</button>
          </form>
        </div>
      )
  }
}

export default withRouter(SearchBar);
