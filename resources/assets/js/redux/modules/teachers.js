// Import
import {DefaultCorsSetting, ApiUrl} from "../../shared/constant";

// action
const SET_TEACHER_LIST = "SET_TEACHER_LIST";
const SET_TEACHER = "SET_TEACHER";

const SET_INSERT_TEACHER_BOOKMARK = "SET_INSERT_TEACHER_BOOKMARK";
const SET_DELETE_TEACHER_BOOKMARK = "SET_DELETE_TEACHER_BOOKMARK";

// action creators

function setInsertTeacherBookmark(teacherId) {
    return {
        type: SET_INSERT_TEACHER_BOOKMARK,
        teacherId
    }
}

function setDeleteTeacherBookmark(teacherId) {
    return {
        type: SET_DELETE_TEACHER_BOOKMARK,
        teacherId
    }
}

function setTeacherList(teacherList) {
    return {
        type: SET_TEACHER_LIST,
        teacherList
    }
}

function setTeacher(teacher) {
    return {
        type: SET_TEACHER,
        teacher
    }
}

// api actions
export function insertTeacherBookmark(teacherId) {
    return (dispatch) => {
        fetch(`${ApiUrl}/data/tutor_profile/favorite`, {
            ...DefaultCorsSetting,
            method: "POST",
            body: `tutor_id=${teacherId}`
        })
            .then(response => response.json())
            .then(json => {
                dispatch(setInsertTeacherBookmark(teacherId));
            });
    }
}

export function deleteTeacherBookmark(teacherId) {
    return (dispatch) => {
        fetch(`${ApiUrl}/data/tutor_profile/unfavorite`, {
            ...DefaultCorsSetting,
            method: "POST",
            body: `tutor_id=${teacherId}`
        })
            .then(response => response.json())
            .then(json => {
                dispatch(setDeleteTeacherBookmark(teacherId));
            })
    }
}

export function getTeacherList(page, subjects, teachingStyles, moneyMin, moneyMax, universityId, teacherLevels, gender) {

    let parameterStr = `page=${page}&subjects=${subjects}&teachingstyles=${teachingStyles}&money_min=${moneyMin}&money_max=${moneyMax}&universityid=${universityId}&teacher_levels=${teacherLevels}&gender=${gender}`;
    return (dispatch) => {
        fetch(`${ApiUrl}/data/tutor_profile?${parameterStr}`, {
            headers: {},
        })
            .then(response => {
                return response.json();
            })
            .then(json => {
                dispatch(setTeacherList(json))
            });
    }
}

export function getTeacher(teacherId) {
    // console.log(teacherId);
    return (dispatch, getState) => {
        fetch(`${ApiUrl}/data/profile/${teacherId}`, {
            headers: {}
        })
            .then(response => response.json())
            .then(json => dispatch(setTeacher(json)));
    }
}

// inital state
const initialState = {
    teacherList: undefined,
    teacher: undefined
};

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TEACHER_LIST:
            return applySetTeacherList(state, action);
        case SET_TEACHER:
            // console.log(action);
            return applySetTeacher(state, action);
        case SET_INSERT_TEACHER_BOOKMARK:
            return applyInsertTeacherBookmark(state, action);
        case SET_DELETE_TEACHER_BOOKMARK:
            return applyDeleteTeacherBookmark(state, action);

        default:
            return state;
    }
}

// reducer functions
function applyDeleteTeacherBookmark(state, action) {
    const {teacherId} = action;
    const {teacher} = state;

    let updatedTeacher = {...teacher, isBooked: false};

    return {
        ...state,
        teacher: updatedTeacher
    }
}

function applyInsertTeacherBookmark(state, action) {
    const {teacherId} = action;
    const {teacher} = state;

    let updatedTeacher = {...teacher, isBooked: true};

    return {
        ...state,
        teacher: updatedTeacher
    }
}

function applySetTeacherList(state, action) {
    const {teacherList} = action;

    return {
        ...state,
        teacherList
    }
}

function applySetTeacher(state, action) {
    const {teacher} = action;
    // this.setState({teacher: teacher});
    // console.log(state);
    return {
        ...state,
        teacher: teacher
    };
}

// exports
const actionCreators = {
    getTeacherList,
    getTeacher
};

// export {actionCreators};

// default reducer
export default reducer;