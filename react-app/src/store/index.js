import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import sightingReducer from './sighting'
import commentsReducer from './comment'
import likesReducer from './like';
import bookmarksReducer from './bookmark';

const rootReducer = combineReducers({
  session,
  sightings: sightingReducer,
  comments: commentsReducer,
  bookmarks: bookmarksReducer,
  likes: likesReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
