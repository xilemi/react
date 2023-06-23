// 使用configureStore
import { configureStore } from "@reduxjs/toolkit"
import countSlice from "./reducers/count.js"
const store = configureStore({
    reducer: {
        // 写reducer切片
        count: countSlice
    }
})
export default store