// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import token from './token';
import holdFor from './holdfor';

const rootReducer = combineReducers({
  token,
  holdFor,
  router
});

export default rootReducer;
