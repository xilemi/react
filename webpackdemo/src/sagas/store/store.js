


import { applyMiddleware, createStore} from 'redux';
import { reducers } from '../reducers';

import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from '@redux-devtools/extension'
import mainSaga from './sagas'


const sagaMiddleware = createSagaMiddleware()  // 得到saga 对象 
const store = createStore(reducers , composeWithDevTools(applyMiddleware(sagaMiddleware))) // 运用到 store 

// 运行saga
sagaMiddleware.run(mainSaga)



export default store;
