import React from 'react';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchActive: false
    }
  }
  toggleSearch(){
    console.log('inside');
    this.setState((prevState) => {
      return { searchActive: !prevState.searchActive }
    });
  }
  render() {
    return(
      <div className='navigation-contain'>
        { this.props.name ? (
          <div>
          <NavBar name={this.props.name} toggleSearch={this.toggleSearch.bind(this)} searchActive={this.state.searchActive}/>
          <SearchBar isActive={this.state.searchActive} toggleSearch={this.toggleSearch.bind(this)}/>
        </div>) : ''}
      </div>
    )
  }
}
