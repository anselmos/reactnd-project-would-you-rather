import RECEIVE_DATA from "../api/api.types";
import {VOTE_USER} from "./users.types"
import {OPTION_ONE, OPTION_TWO} from "../components/QuestionVote";
import {act} from "@testing-library/react";

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
        default:
            return state
    }
}
