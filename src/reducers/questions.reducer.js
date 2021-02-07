import RECEIVE_DATA from "../api/api.types";

export function questions(state= [], action){
    switch(action.type){
        case RECEIVE_DATA:
            return action.questions
        default:
            return state
    }
}
