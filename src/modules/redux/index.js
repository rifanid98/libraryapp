import { combineReducers, createStore, applyMiddleware } from "redux";
import reduxPromise from 'redux-promise-middleware';
import logger from "redux-logger";

// Persist Library
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';


/**
 * reducer
 */
import auth from './auth/reducer';
import books from "./books/reducer";
import genres from "./genres/reducer";
import histories from "./histories/reducer";
import authors from "./authors/reducer";
import users from "./users/reducer";

// Combine The Reducers
const reducer = combineReducers({
  auth,
  books,
  genres,
  histories,
  authors,
  users
})

/**
 * PersistConfig
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    "auth",
    "books",
    "genres",
    "authors",
    "users",
  ]
}

const persistedReducer = persistReducer(persistConfig, reducer);

/**
 * store
 */
export const store = createStore(
  persistedReducer,
  applyMiddleware(reduxPromise)
  // applyMiddleware(reduxPromise, logger)
);

/**
 * dispatcher
 */
export * from './auth/actions';
export * from './books/actions';
export * from './genres/actions';
export * from './histories/actions';
export * from './authors/actions';
export * from './users/actions';

/**
 * selector
 */
// export * from './post/selector';
// export * from './profile/selector';