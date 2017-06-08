import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/searchActions';

function mapStateToProps(state, ownProps){
  return { token: state.user.token, search: state.search, ...ownProps }
}

class SearchPage extends React.Component {
  fetchData(){
    var token = this.props.token,
        searchType = this.props.match.params.type,
        query = this.props.match.params.query;
    if(token && searchType && query){
      this.props.dispatch(actions.updateSearchInfo(this.props.location.pathname, searchType, query));
      this.props.dispatch(actions.getSearchResults(token, searchType, query));
    }
  }
  componentWillMount(){
    this.fetchData();
  }
  componentDidUpdate(prevProps){
    if(prevProps.location.pathname !== this.props.location.pathname){
      this.fetchData();
    }
  }
  render() {
    return (
      <div className='search-contain'>
        <div className='contents'>
          {
            this.props.search.searchResults[
                this.props.match.params.type.match(/artist|genre/i) ? 'artists' : `${this.props.match.params.type}s`
              ].length ?
            ( <h3>Found {this.props.search.searchResults[
                this.props.match.params.type.match(/artist|genre/i) ? 'artists' : `${this.props.match.params.type}s`
              ].length} {this.props.match.params.type.match(/genre/i) ? (<span><span className='search-term'>{`${decodeURIComponent(this.props.match.params.query)}`}</span> Artist</span>) : this.props.match.params.type}{this.props.search.searchResults[
                  this.props.match.params.type.match(/artist|genre/i) ? 'artists' : `${this.props.match.params.type}s`
                ].length > 1 ? 's' : ''}{!this.props.match.params.type.match(/genre/i) ? (<span> Matching The Term:<br/><span className='search-term'>{`${decodeURIComponent(this.props.match.params.query)}`}</span></span>) : ''}</h3> ) : ( <h3>No Results</h3> )
          }
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(SearchPage);
