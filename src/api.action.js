import RECEIVE_DATA from "./api.types";


export function receiveDataAction (users, questions) {
  return {
    type: RECEIVE_DATA,
    users,
    questions,
  }
}