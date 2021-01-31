import {applyMiddleware, combineReducers, createStore} from 'redux';
import {users} from "./users.reducer";
import {loading} from "./loading.reducer";
import {logger} from './logger.middleware';

const store = createStore(combineReducers({
    users, loading,
}), applyMiddleware(logger))

export default store;