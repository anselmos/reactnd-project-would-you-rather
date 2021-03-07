import {applyMiddleware, combineReducers, createStore} from 'redux';
import {users} from "./users/users.reducer";
import {loading} from "./reducers/loading.reducer";
import {logger} from './logger.middleware';
import {questions} from './questions/questions.reducer';
const store = createStore(
    combineReducers({
    users, loading, questions
    }),
window.__REDUX_DEVTOOLS_EXTENSION__ && process.env.NODE_ENV === "development"&& window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger)
)

export default store;