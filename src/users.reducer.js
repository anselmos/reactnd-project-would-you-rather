import RECEIVE_DATA from "./users.types";

export function users(state= [], action){
    switch(action.type){
        case RECEIVE_DATA:
            return action.users
        default:
            return state
    }
}
