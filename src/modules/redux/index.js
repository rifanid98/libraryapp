import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxPromise from 'redux-promise-middleware';
import logger from "redux-logger";

import auth from './auth/reducer';

/**
 * reducer
 */
export const reducer = combineReducers({
  auth
})

/**
 * store
 */
export const store = createStore(
  reducer,
  applyMiddleware(reduxPromise, logger)
);

/**
 * dispatcher
 */
export * from './auth/actions';

/**
 * selector
 */
// export * from './post/selector';
// export * from './profile/selector';