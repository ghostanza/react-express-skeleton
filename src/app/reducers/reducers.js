import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import user from './userReducer';
import artist from './artistReducer';

export default combineReducers({
  user,
  artist,
  routing
});
