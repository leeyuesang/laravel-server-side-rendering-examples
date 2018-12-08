// IMPOrt
// import { actionCreators as userActions } from "redux/modules/user";

// action
const SET_FEED = "SET_FEED";


// action creators
function setFeed(feed) {
    return {
        type: SET_FEED,
        feed
    }
}
// api actions

function getFeed() {
    return (dispatch, getState) => {
        const {currentLoginUser} = getState();

        fetch("http://localhost:8000/data/blog/", {
            headers: {}
        })
            .then(response => {
                    // if(response.status === 401) {
                    //     dispatch(userActions.logout());
                    // }

                    return response.json();
                })
            .then(json => dispatch(setFeed(json.data)));
    }
}

// inital state

const initialState = {
    feed: []
};


// reducer

function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_FEED:
            return applySetFeed(state, action);
        default:
            return state;
    }
}

// reducer functions
function applySetFeed(state, action) {
    const { feed } = action;
    return {
        ...state,
        feed
    }
}

// exports
const actionCreators = {
    getFeed
};

export {actionCreators};

// default reducer


export default reducer;