import RECEIVE_DATA from "../api/api.types";
import ADD_QUESTION from "./questions.types";

export function questions(state= [], action){
    switch(action.type){
        case ADD_QUESTION:
            let copyData = { ...state};
            copyData[action.question.id] = action.question;
            return copyData;
        case RECEIVE_DATA:
            return action.questions
        default:
            return state
    }
}
