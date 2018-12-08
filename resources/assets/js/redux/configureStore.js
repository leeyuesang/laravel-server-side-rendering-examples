import {applyMiddleware, combineReducers, createStore} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import createHistory from "history/createBrowserHistory";
import thunk from "redux-thunk";
import user from "./modules/user";
import teachers from "./modules/teachers";
import blogs from "./modules/blogs";
import util from "./modules/util";
import {i18nState} from "redux-i18n";
// import {reducer as toastrReducer} from "react-redux-toastr";

const env = process.env.NODE_ENV;
const history = createHistory();

const middlewares = [thunk, routerMiddleware(history)];

let store;

const reducer = combineReducers({
    user,
    blogs,
    teachers,
    util,
    routing: routerReducer,
    i18nState,
});

if (env === "development") {
    const {logger} = require("redux-logger");
    middlewares.push(logger);

    store = initialState =>
        createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
    store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

// let store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export {history};
export default store();