import {applyMiddleware, combineReducers, createStore} from 'redux';
import {users} from "./users.reducer";



const logger = (store) => (next) => (action) => {
  console.group(action.type)
    console.log('The action: ', action)
    const result = next(action)
    console.log('The new state: ', store.getState())
  console.groupEnd()
  return result
}
const store = createStore(combineReducers({
    users,
}), applyMiddleware(logger))

export default store;