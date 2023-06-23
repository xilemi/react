
import { combineReducers } from 'redux-immutable';
import { data } from './data';
import { info } from './info';


export const reducers = combineReducers({
    data,
    info 
})