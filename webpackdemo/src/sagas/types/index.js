

// 专门常量

export const COUNTADD = "COUNTADD"
export const CHANGECOUNT = "CHANGECOUNT"
export const CHANGE_TEST_SYNC = "CHANGE_TEST_SYNC"
export const CHANGE_LIST_SYNC = "CHANGE_LIST_SYNC" 

export const commonAction = (type,payload)=>{
    return {
        type,
        payload
    }
}