import { QUESTION_USER, VOTE_USER } from "./users.types";

export function voteUserAction(user, vote, question) {
  return {
    type: VOTE_USER,
    user,
    vote,
    question,
  };
}
export function newQuestionUser(user, question) {
  return {
    type: QUESTION_USER,
    user,
    question,
  };
}
