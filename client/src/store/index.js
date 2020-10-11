import {createStore, applyMiddleware, combineReducers} from "redux";
import {logger} from "redux-logger";
import {rootReducer} from "./reducers/rootReducer";
import {reducer as formReducer} from 'redux-form'

const reducers = {
    storage: rootReducer,
    form: formReducer
}

const reducer = combineReducers(reducers)
const store = createStore(reducer, applyMiddleware(logger))

export default store;