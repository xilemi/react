
import { fromJS } from "immutable";
import { CHANGECOUNT, CHANGE_LIST_SYNC, CHANGE_TEST_SYNC, COUNTADD } from "../types";
export const data = (state = fromJS({
    num:1000,
    test:'测试API',
    list:[]

}),{
    type,
    payload 
})=>{
    
    switch(type){

        case COUNTADD:
            return state.update('num',x=>x+1)
            break;

        case CHANGECOUNT:
            return state.update('num',x=>x+payload)
            break;

        case CHANGE_TEST_SYNC:
            return state.set('test',payload)
            break;

        case CHANGE_LIST_SYNC:
            return state.set('list',payload)
            break;

        default:
            return state 
            break;
    }
}