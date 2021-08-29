import {createStore, combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import * as reducers from './reducers'

const combinedReducer = combineReducers(reducers);
const store = createStore(combinedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
export default store;