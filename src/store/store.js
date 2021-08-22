import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './reducers'

const combinedReducer = combineReducers(reducers);
const store = createStore(combinedReducer, {}, applyMiddleware(thunk));
export default store;