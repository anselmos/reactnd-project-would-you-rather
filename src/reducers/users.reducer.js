import RECEIVE_DATA from "../api/api.types";

export function users(state= [], action){
    switch(action.type){
        case RECEIVE_DATA:
            return action.users
        default:
            return state
    }
}
