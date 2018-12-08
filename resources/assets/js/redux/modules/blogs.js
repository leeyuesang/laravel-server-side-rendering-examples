// Import
import _ from "lodash";
import user from "./user";
import {CommentType, DefaultCorsSetting, ApiUrl} from "../../shared/constant";
import {getFormattedDateStr} from "../../shared/functions";
import {toast} from "react-toastify";

// action
const SET_BLOG_POST_LIST = "SET_BLOG_POST_LIST";
const SET_BLOG_POST = "SET_BLOG_POST";
const SET_BLOG_CATEGORY_LIST = "SET_BLOG_CATEGORY_LIST";

const INSERT_BLOG_POST_BOOKMARK = "INSERT_BLOG_POST_BOOKMARK";
const DELETE_BLOG_POST_BOOKMARK = "DELETE_BLOG_POST_BOOKMARK";

const INSERT_NEW_COMMENT = "INSERT_NEW_COMMENT";
// action creators

function setInsertNewComment(newCommentContent, targetId, commentTypeSlug, loginUserDetail) {
    console.log(commentTypeSlug);
    return {
        type: INSERT_NEW_COMMENT,
        commentTypeSlug,
        targetId,
        newCommentContent,
        loginUserDetail
    }
}
function setInsertBlogPostBookmark(blogPostId) {
    return {
        type: INSERT_BLOG_POST_BOOKMARK,
        blogPostId
    }
}

function setDeleteBlogPostBookmark(blogPostId) {
    return {
        type: DELETE_BLOG_POST_BOOKMARK,
        blogPostId
    }
}

export function setBlogPostList(blogPostList) {
    return {
        type: SET_BLOG_POST_LIST,
        blogPostList
    }
}

export function setBlogPost(blogPost) {
    return {
        type: SET_BLOG_POST,
        blogPost
    }
}

export function setBlogCategoryList(blogCategoryList) {
    // console.log(blogCategoryList);
    return {
        type: SET_BLOG_CATEGORY_LIST,
        blogCategoryList
    }
}

// api actions
export function getBlogPostList(page, categoryIdsStr) {
    // console.log(page, categoryIdsStr);
    // console.log(`catalogue=${categoryIdsStr}&page=${page}`);
    let paramStr = `page=${page}&catalogue=${categoryIdsStr}`;

    // alert(paramStr);
    return (dispatch) => {
        fetch(`${ApiUrl}/data/blog?${paramStr}`, {
            ...DefaultCorsSetting,
            method: "GET",

        })
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                dispatch(setBlogPostList(json))
            });
    }
}

export function insertNewComment(newCommentContent, targetId, commentTypeSlug, parentCommentId, replyToId) {
    return (dispatch, getState) => {
        fetch(`${ApiUrl}/data/blog/comment/new`, {
            ...DefaultCorsSetting,
            method: "POST",
            body: `comment_content=${newCommentContent}&blog_id=${targetId}&father_comment_id=${parentCommentId}&reply_to_id=${replyToId}`,
        })
            .then(response=> response.json())
            .then(json => {
                const { user: { loginUserDetail }} = getState();

                dispatch(setInsertNewComment(newCommentContent, targetId, CommentType.BLOG_POST, loginUserDetail));
            });
    }
}

export function getBlogPost(blogPostId) {
    return (dispatch, getState) => {
        fetch(`${ApiUrl}/data/blog/${blogPostId}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            },
            credentials: "include",
        })
            .then(response => response.json())
            .then(json => dispatch(setBlogPost(json)));
    }
}

export function getBlogCategoryList() {
    return (dispatch, getState) => {
        fetch(`${ApiUrl}/data/api/blogCatalogues?lan=ko`, {
            headers: {},
            credentials: "include",
        })
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                dispatch(setBlogCategoryList(json))
            });
    }
}


export function insertBlogPostBookmark(blogPostId) {
    return function (dispatch) {

        fetch(`${ApiUrl}/data/blog/favorite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            },
            credentials: "include",
            body: `blog_id=${blogPostId}`,
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === "success") {
                    toast.success("북마크 추가 완료", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(setInsertBlogPostBookmark(blogPostId));
                    //         showNotify('cn' == lang ? '收藏成功！' :
                    //             'en' == lang ? 'Bookmark Complete.' : "찜하기 완료.", "success");
                    //         $scope.blogShowMessage.isBooked = true;
                } else {
                    if (json.msg === "You are not a student!") {
                        toast.success("학생 회원만 북마크가 가능합니다.", {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                        //             showNotify('en' == lang ? 'You are not a student!' : 'cn' == lang ? 'You are not a student!' : '학생 회원만 북마크하실 수 있습니다.', "danger");
                    }
                }
            });
    }
}


export function deleteBlogPostBookmark(blogPostId) {
    return function (dispatch) {

        fetch(`${ApiUrl}/data/blog/unfavorite`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;',
            },
            credentials: "include",
            body: `blog_id=${blogPostId}`,
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === "success") {
                    toast.success("북마크를 삭제하였습니다.", {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    dispatch(setDeleteBlogPostBookmark(blogPostId));

                    // showNotify('cn' == lang ? "取消收藏成功！" : 'en' == lang ? "Unbookmark Success" : "해당 글을 북마크에서 삭제하였습니다.", "success");
                }
            });
    }
}


// inital state
const initialState = {
    blogPostList: undefined,
    blogPost: undefined,
    blogCategoryList: undefined,
};

// reducer
function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_BLOG_POST_LIST:
            return applySetBlogPostList(state, action);
        case SET_BLOG_POST:
            // console.log(action);
            return applySetBlogPost(state, action);
        case SET_BLOG_CATEGORY_LIST:
            return applySetBlogCategoryList(state, action);
        case INSERT_BLOG_POST_BOOKMARK:
            return applyInsertBlogPostBookmark(state, action);
        case DELETE_BLOG_POST_BOOKMARK:
            return applyDeleteBlogPostBookmark(state, action);
        case INSERT_NEW_COMMENT:
            return applyInsertNewComment(state, action);
        default:
            return state;
    }
}

// reducer functions

function applyInsertNewComment(state, action) {
    const {commentTypeSlug, targetId, newCommentContent, loginUserDetail} = action;
    const {blogPost} = state;

    console.log(newCommentContent);
    // const updatedBlogPostCommentList = blogPost.comments;

    console.log(loginUserDetail);
    const newComment = {
        full_name: `${loginUserDetail.profile.last_name}${loginUserDetail.profile.first_name}`,
        blog_id: blogPost.id,
        comment_content: newCommentContent,
        created_at: getFormattedDateStr(new Date()),
        updated_at: getFormattedDateStr(new Date()),
        is_this_user: 1,
        picture: loginUserDetail.profile.picture,
        status: 1,
        sub_comments: [],
    };

    console.log(blogPost.comments);

    blogPost.comments.push(newComment);
    // blogPost.comments =

    return {
        ...state,
        blogPost: blogPost
    }
}

function applyInsertBlogPostBookmark(state, action) {
    const {blogPostId} = action;
    const {blogPost} = state;

    const updatedBlogPost = {...blogPost, isBooked: true};

    console.log(updatedBlogPost);
    return {
        ...state,
        blogPost: updatedBlogPost
    }
}

function applyDeleteBlogPostBookmark(state, action) {
    const {blogPostId} = action;
    const {blogPost} = state;

    const updatedBlogPost = {...blogPost, isBooked: false};

    return {
        ...state,
        blogPost: updatedBlogPost
    }
}

function applySetBlogPostList(state, action) {
    const {blogPostList} = action;

    return {
        ...state,
        blogPostList
    }
}

function applySetBlogPost(state, action) {
    const {blogPost} = action;
    // this.setState({teacher: teacher});
    // console.log(teacher);
    // console.log(state);
    return {
        ...state,
        blogPost
    };
}

function applySetBlogCategoryList(state, action) {
    const {blogCategoryList} = action;

    return {
        ...state,
        blogCategoryList
    }
}

// exports
const actionCreators = {
    getBlogPostList,
    getBlogPost,
    getBlogCategoryList
};

// export {actionCreators};

// default reducer
export default reducer;