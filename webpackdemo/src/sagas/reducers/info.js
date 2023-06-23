
import { fromJS } from "immutable";

export const info = (state = fromJS({
    userInfo:null 
}),{
    type,
    payload 
})=>{ 
    switch(type){
        default:
            return state;
            break;
    }
}