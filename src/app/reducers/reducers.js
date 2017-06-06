import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './userReducer';
import artist from './artistReducer';
import track from './trackReducer';

export default combineReducers({
  user,
  artist,
  track,
  routing
});
