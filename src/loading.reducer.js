import RECEIVE_DATA from "./users.types";

export function loading(state= true, action){
    switch(action.type){
        case RECEIVE_DATA:
            return false
        default:
            return state
    }
}
