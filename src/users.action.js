import RECEIVE_DATA from "./users.types";


export function receiveDataAction (users) {
  return {
    type: RECEIVE_DATA,
    users,
  }
}