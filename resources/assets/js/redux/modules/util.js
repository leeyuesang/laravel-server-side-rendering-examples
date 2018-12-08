// Import
// import {actionCreators as userActions} from "redux/modules/user";

// action
import {DefaultCorsSetting} from "../../shared/constant";

const SET_UNIVERSITY_LIST = "SET_UNIVERSITY_LIST";
const SET_LOCATION_LIST = "SEC_LOCATION_LIST";
const SET_CURRICULUM_LIST = "SET_CURRICULUM_LIST";

// action creators
function setUniversityList(universityList) {
    return {
        type: SET_UNIVERSITY_LIST,
        universityList
    }
}

function setLocationList(locationList) {
    return {
        type: SET_LOCATION_LIST,
        locationList
    }
}

function setCurriculumList(curriculumList) {
    return {
        type: SET_CURRICULUM_LIST,
        curriculumList
    }
}

// api actions
export function getUniversityList() {

    return (dispatch) => {
        fetch(`http://localhost:8000/data/api/universities`, {
            ...DefaultCorsSetting
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                dispatch(setUniversityList(json))
            });
    }
}

export function getLocationList() {

    return (dispatch) => {
        fetch(`http://localhost:8000/data/api/locations`, {
            ...DefaultCorsSetting,
        })
            .then(response => {return response.json()})
            .then(json => {
                dispatch(setLocationList(json))
            });
    }
}

export function getCurriculumList() {

    return (dispatch) => {
        fetch(`http://localhost:8000/data/api/curriculums`, {
            ...DefaultCorsSetting,
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                dispatch(setCurriculumList(json))
            });
    }
}

// inital state
const initialState = {
    universityList: undefined,
    locationList: undefined,
    curriculumList: undefined
};

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_UNIVERSITY_LIST:
            return applySetUniversityList(state, action);
        case SET_LOCATION_LIST:
            return applySetLocationList(state, action);
        case SET_CURRICULUM_LIST:
            return applySetCurriculumList(state, action);
        default:
            return state;
    }
}

// reducer functions
function applySetCurriculumList(state, action) {
    const {curriculumList} = action;

    return {
        ...state,
        curriculumList
    }
}

function applySetLocationList(state, action) {
    const {locationList} = action;

    return {
        ...state,
        locationList
    }
}

function applySetUniversityList(state, action) {
    const {universityList} = action;

    return {
        ...state,
        universityList
    }
}

// exports
// const actionCreators = {
//     getTeacherList,
//     getTeacher
// };

// export {actionCreators};

// default reducer
export default reducer;