import { reducer } from "./reducer/index.js"
import { createStore } from 'redux'
const store = createStore(reducer)
export default store