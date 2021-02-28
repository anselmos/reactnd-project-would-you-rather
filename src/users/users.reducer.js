import RECEIVE_DATA from "../api/api.types";
import {VOTE_USER, QUESTION_USER} from "./users.types"
import {OPTION_ONE, OPTION_TWO} from "../components/QuestionVote";

export function users(state= [], action){
    switch(action.type){
        case RECEIVE_DATA:
            return action.users
        case VOTE_USER:
            let userVoted = { ...state};
            // TODO check if this code can be refactored/reduced in some way
            if(action.vote === OPTION_ONE){
                userVoted[action.user.id].answers = Object.assign(userVoted[action.user.id].answers, {[ action.question.id]: "optionOne"})
            }
            if(action.vote === OPTION_TWO) {
                userVoted[action.user.id].answers = Object.assign(userVoted[action.user.id].answers, {[ action.question.id]: "optionTwo"})
            }
            return userVoted;
        case QUESTION_USER:
            let userQuestion = { ...state};
            userQuestion[action.user.id].questions = userQuestion[action.user.id].questions.concat(action.question.id)
            return state;
        default:
            return state
    }
}
