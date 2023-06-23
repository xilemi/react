import { getListApi } from "../api"
import { call, put, takeLatest } from "redux-saga/effects"
export const GET_LIST_ASYNC = "GET_LIST_ASYNC"
function* getList() {
    console.log(111);
    let res = yield call(getListApi, { count: 1, limitNum: 10 })
    yield put({
        type: GET_LIST_ASYNC,
        payload: res.data
    })
}


function* MainSaga() {
    yield takeLatest(GET_LIST_ASYNC, getList)
}
export default MainSaga