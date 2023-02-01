import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import auth from './Reducers/auth';

const rootReducer = combineReducers({
    auth,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;