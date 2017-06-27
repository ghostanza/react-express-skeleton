import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/searchActions';
import SearchResults from 'page_components/search/SearchResults';

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
    document.querySelectorAll('.search-contain')[0] && document.querySelectorAll('.search-contain')[0].scrollIntoView({block: 'start'});
  }
  render() {
    var type = this.props.match.params.type.match(/artist|genre/i) ? 'artists' : `${this.props.match.params.type}s`,
        results = this.props.search.searchResults[type];
    return (
      <div className='search-contain'>
        <div className='contents'>
          <h1>{`"${decodeURIComponent(this.props.match.params.query)}"`}</h1>
          { results.length ? (<SearchResults results={results} type={type} />) : '' }
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps)(SearchPage);
