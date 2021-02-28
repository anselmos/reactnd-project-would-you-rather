import {VOTE_USER} from "./users.types";

export function voteUser (user, vote, question) {
  return {
    type: VOTE_USER,
    user, vote, question
  }
}