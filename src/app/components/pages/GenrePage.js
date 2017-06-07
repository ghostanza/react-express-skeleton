import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/genreActions';
import { Link } from 'react-router-dom';
import Loader from 'components/main/Loader';

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
    console.log(this.props);
    return(
      <div className='genre-contain'>
        <div className='contents'>
        <h1>{this.props.match.params.genre} Artists</h1>
        {this.props.genre.isLoading ? (<Loader />) : (
            <ul>
              { this.props.genre.genre_artists.map((artist) => {
                return (
                  <li key={artist.id}>
                    <Link to={`/artist/${artist.id}`}>
                      <span className='genre-hover'>{artist.name}</span>
                      <img src={artist.images[1] ? artist.images[1].url : artist.images[0].url}/>
                    </Link>
                  </li>
                )
              })}
            </ul>
        )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(GenrePage);
