import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers';

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'
import MainSaga from './reducers/info';


const sagaMiddleware = createSagaMiddleware()  // 得到saga 对象 
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware))) // 运用到 store 

// 运行saga
sagaMiddleware.run(MainSaga)



export default store;
