import ADD_QUESTION from "./questions.types";


export function addQuestionAction (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}