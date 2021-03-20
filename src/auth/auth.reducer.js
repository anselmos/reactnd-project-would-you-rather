import { SET_AUTH_USER } from "./auth.action";

export function auth_user(state = null, action) {
  switch (action.type) {
    case SET_AUTH_USER:
      return action.user;
    default:
      return state;
  }
}
