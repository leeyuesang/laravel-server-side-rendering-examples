//imports
import _ from "lodash";
import {ApiUrl, DefaultCorsSetting} from "../../shared/constant";

//actions

const SAVE_TOKEN = "SAVE_TOKEN";
const SET_IS_LOGGED_IN = "SET_IS_LOGGED_IN";
const SET_LOGIN_USER = "SET_LOGIN_USER";
const SET_LOGIN_USER_DETAIL = "SET_LOGIN_USER_DETAIL";
const LOGOUT = "LOGOUT";

//initail state
const LOGIN_USER_VARIABLE_NAME = "loginUser";
const LOGIN_USER_DETAIL_VARIABLE_NAME = "loginUserDetail";

const initialState = {
    isLoggedIn: !!localStorage.getItem(LOGIN_USER_VARIABLE_NAME),
    loginUser: JSON.parse(localStorage.getItem(LOGIN_USER_VARIABLE_NAME)),
    loginUserDetail: JSON.parse(localStorage.getItem(LOGIN_USER_DETAIL_VARIABLE_NAME))
};

//actions creators

function logout() {
    return {
        type: LOGOUT
    }
}

function setIsLoggedIn(isLoggedIn) {
    return {
        type: SET_IS_LOGGED_IN,
        isLoggedIn
    }
}

function setLoginUser(loginUser) {
    return {
        type: SET_LOGIN_USER,
        loginUser,
        isLoggedIn: true
    }
}

function setLoginUserDetail(loginUserDetail) {
    return {
        type: SET_LOGIN_USER_DETAIL,
        loginUserDetail
    }
}

// API Actions

export function doLogout() {
    return (dispatch) => {
        fetch(`${ApiUrl}/data/logout`, {
            method: "GET",
            ...DefaultCorsSetting
        })
            .then(response => response.json() )
            .then(json => {
                dispatch(logout())
            })
    }
}

export function getIsLoggedIn() {
    return (dispatch) => {
        fetch(`${ApiUrl}/data/api/isLogin`, {
            ...DefaultCorsSetting
        })
            .then(response => response.json())
            .then(json => {
                dispatch(setIsLoggedIn(json))
            });
    }
}

export function usernameLogin(username, password) {
    return function (dispatch) {
        fetch(`${ApiUrl}/data/login`, {
            ...DefaultCorsSetting,
            method: "POST",
            body: `email=${username}&password=${password}`,
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.status == "success") {
                    dispatch(setLoginUser(json));

                    fetch(`${ApiUrl}/data/api/thisUser`, {
                        method: "GET",
                        ...DefaultCorsSetting
                    })
                        .then(response => response.json())
                        .then(json => {
                            console.log(json);
                            dispatch(setLoginUserDetail(json));
                        })
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}

//reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT:
            return applyLogout(state, action);
        case SET_LOGIN_USER:
            return applySetLoginUser(state, action);
        case SET_IS_LOGGED_IN:
            return applySetIsLoggedIn(state, action);
        case SET_LOGIN_USER_DETAIL:
            return applySetLoginUserDetail(state, action);

        default:
            return state;
    }
}



function applySetIsLoggedIn(state, action) {
    const {isLoggedIn} = action;

    return {
        ...state,
        isLoggedIn
    }
}

function applySetLoginUserDetail(state, action) {
    const {loginUserDetail} = action;

    console.log(loginUserDetail);
    localStorage.setItem(LOGIN_USER_DETAIL_VARIABLE_NAME, JSON.stringify(loginUserDetail));

    return {
        ...state,
        loginUserDetail
    }
}

function applySetLoginUser(state, action) {
    const {loginUser, isLoggedIn} = action;

    localStorage.setItem(LOGIN_USER_VARIABLE_NAME, JSON.stringify(loginUser));
    console.log(loginUser);
    return {
        ...state,
        isLoggedIn: isLoggedIn,
        loginUser: loginUser
    }

    // localStorage.setItem("loginUser", loginUser);
    // console.log(localStorage.getItem("loginUser"));

}

function applyLogout(state, action) {
    localStorage.removeItem(LOGIN_USER_VARIABLE_NAME);
    localStorage.removeItem(LOGIN_USER_DETAIL_VARIABLE_NAME);

    return {
        ...state,
        isLoggedIn: false,
        loginUser: undefined,
        loginUserDetail: undefined
    }
}

//exports
//
// const actionCreators = {
//     getIsLoggedIn,
//     logout
// };
//

export default reducer;