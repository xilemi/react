import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"

// 数据持久化
import {
    persistStore, persistReducer
} from 'redux-persist';
import storage from 'redux-persist/es/storage';
import newsSlice from "./reducers/newsSlice";
import findSlice from "./reducers/findSlice";

//根reducer
const reducer = combineReducers({
    userInfo: userSlice,
    newsInfo: newsSlice,
    findInfo: findSlice
})

// 数据持久化的配置
const persistConfig = {
    key: 'root',
    storage,
    // 有些数据不缓存
    blacklist: []
};

// 持久化根reducer
const persistedReducer = persistReducer(persistConfig, reducer)
// 持久化的reducer
const store = configureStore({
    reducer: persistedReducer,
    //关闭序列话校验
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})
// 导出
export const persistor = persistStore(store);


export default store