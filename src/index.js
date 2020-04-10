import React, {createContext} from 'react'; //context api
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers'

// function logger(obj, next, action)
const logger = ({dispatch, getState}) => (next) => (action) => {
  if(typeof action !== 'function'){
    console.log('ACTION-TYPE: ', action.type);
  }
  next(action);
}

/* Thunk is doing this from redux-thunk */

// const thunk = ({dispatch, getState}) => (next) => (action) => {
//   if(typeof action === 'function'){
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
export const StoreContext = createContext();

console.log('store', store);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App store={store}/>
  </StoreContext.Provider>
  ,
  document.getElementById('root')
  );
