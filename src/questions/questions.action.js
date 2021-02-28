import {ADD_QUESTION, VOTE_QUESTION} from "./questions.types";


export function addQuestionAction (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function voteOnQuestionAction (user, vote, question) {
  return {
    type: VOTE_QUESTION,
    user, vote, question
  }
}