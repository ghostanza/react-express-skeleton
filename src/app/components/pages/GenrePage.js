import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/genreActions';
import Loader from 'components/main/Loader';
import GenreArtists from 'page_components/genre/GenreArtists';

function mapStateToProps(state, ownProps){
  return { token: state.user.token, genre: state.genre, ...ownProps }
}

class GenrePage extends React.Component {
  componentWillMount(){
    var token = this.props.token,
        current_genre = this.props.genre.current_genre,
        url_genre = this.props.match.params.genre;
    if(token && (current_genre != url_genre) ){
      this.props.dispatch(actions.setCurrentGenre(url_genre));
      this.props.dispatch(actions.getGenreArtists(token, url_genre));
    }
  }
  render() {
    return(
      <div className='genre-contain'>
        <div className='contents'>
        <h1>{this.props.match.params.genre} Artists</h1>
        {this.props.genre.isLoading ? (<Loader />) : (<GenreArtists artists={this.props.genre.genre_artists}/>)}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(GenrePage);
