import {applyMiddleware, combineReducers, createStore} from 'redux';
import {users} from "./users.reducer";
import {loading} from "./loading.reducer";
import {logger} from './logger.middleware';
import {questions} from './questions.reducer';

const store = createStore(
    combineReducers({
    users, loading, questions
    }),
    // FIXME remove later - only for debugging
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(logger)
)

export default store;