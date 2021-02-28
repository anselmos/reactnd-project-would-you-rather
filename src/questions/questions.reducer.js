import RECEIVE_DATA from "../api/api.types";
import {ADD_QUESTION, VOTE_QUESTION} from "./questions.types";
import {OPTION_ONE, OPTION_TWO} from '../components/QuestionVote';

export function questions(state= [], action){
    switch(action.type){
        case ADD_QUESTION:
            let copyData = { ...state};
            copyData[action.question.id] = action.question;
            return copyData;
        case VOTE_QUESTION:
            let voteDataQuestion = { ...state};
            if(action.vote === OPTION_ONE){
                voteDataQuestion[action.question.id].optionOne.votes = voteDataQuestion[action.question.id].optionOne.votes.concat(action.user.id)

            }
            if(action.vote === OPTION_TWO) {
                voteDataQuestion[action.question.id].optionTwo.votes = voteDataQuestion[action.question.id].optionTwo.votes.concat(action.user.id)
            }
            return voteDataQuestion;
        case RECEIVE_DATA:
            return action.questions
        default:
            return state
    }
}
