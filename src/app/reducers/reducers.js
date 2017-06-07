import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './userReducer';
import artist from './artistReducer';
import track from './trackReducer';
import genre from './genreReducer';

export default combineReducers({
  user,
  artist,
  genre,
  track,
  routing
});
