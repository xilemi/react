// put 类似 dispatch put({ type: '', payload: ''}) 触发状态的修改
// call 用来调用数据请求   call(getBannerList)  ===>    getBannerList()
// takeLatest 用来响应触发哪一个异步操作


// Effect 

// take：take函数可以理解为监听未来的action，它创建了一个命令对象，告诉middleware等待一个特定的action， Generator会暂停，直到一个与pattern匹配的action被发起，才会继续执行下面的语句，也就是说，take是一个阻塞的 effect
// put：put函数是用来发送action的 effect，你可以简单的把它理解成为redux框架中的dispatch函数，当put一个action后，reducer中就会计算新的state并返回，注意： put 也是阻塞 effect
// call：call函数你可以把它简单的理解为就是可以调用其他函数的函数，它命令 middleware 来调用fn 函数， args为函数的参数，注意： fn 函数可以是一个 Generator 函数，也可以是一个返回 Promise 的普通函数，call 函数也是阻塞 effect

// fork：fork 函数和 call 函数很像，都是用来调用其他函数的，但是fork函数是非阻塞函数，也就是说，程序执行完 yield fork(fn， args) 这一行代码后，会立即接着执行下一行代码语句，而不会等待fn函数返回结果后，在执行下面的语句

// select：select 函数是用来指示 middleware调用提供的选择器获取Store上的state数据，你也可以简单的把它理解为redux框架中获取store上的 state数据一样的功能 ：store.getState()

// takeEvery：允许多个 fetchData 实例同时启动。在某个特定时刻，尽管之前还有一个或多个 fetchData 尚未结束，我们还是可以启动一个新的 fetchData 任务，

// takeLatest：与takeEvery 不同，在任何时刻 takeLatest 只允许一个 fetchData 任务在执行。并且这个任务是最后被启动的那个。 如果已经有一个任务在执行的时候启动另一个 fetchData ，那之前的这个任务会被自动取消。（始终显示最新版本的数据）



// * + yield = async + await = generator (异步编程解决方案)

import { call, put, takeLatest, fork } from 'redux-saga/effects'
import { getListAPI, getTestAPI } from '../api/api'
import { CHANGE_LIST_SYNC, CHANGE_TEST_SYNC } from '../types'


// 处理异步  (子saga)
// 先请求数据 再去 put dispatch 一个 action 
function* changeTestAsync(action) {
    const res = yield call(getTestAPI, { id: 2302 })

    yield put({   // 才会进入reducers 修改数据 
        type: CHANGE_TEST_SYNC,
        payload: res.data.message
    })
}

function* changeListAsync({ payload }) {
    const res = yield call(getListAPI, payload)
    yield put({
        type: CHANGE_LIST_SYNC,
        payload: res.data.data
    })
}


// 主Saga   集合所有的 异步数据请求的 api 函数 
function* MainSaga() {
    yield takeLatest("CHANGE_TEST", changeTestAsync)   // CHANGE_TEST action.type  进入对应的异步处理函数 

    yield takeLatest('CHANGE_LIST', changeListAsync)
}

export default MainSaga




