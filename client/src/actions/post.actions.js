import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const LIKE_POST_UNLIKE_POST = "LIKE_POST_UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

// les commentaires
export const ADD_COMMENt = "ADD_COMMENt";
export const EDIT_COMMENt = "EDIT_COMMENt";
export const DELETE_COMMENT = "DELETE_COMMENT";



export const getPosts = (num) => {
    return (dispatch) => {
        return axios
            .get(`${process.env.REACT_APP_API_URL}post/`)
            .then((res) => {
                const array = res.data.slice(0, num)
                dispatch({ type: GET_POSTS, payload: array});
            })
            .catch((err) => console.log(err))
    }
}


//traiter les erreurs après
export const createPost = (data) => {
     return (dispatch) => {
        return axios
            .post(`${process.env.REACT_APP_API_URL}post/`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}


export const like_unlike_post = (postId, userId) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}post/liker-unliker/` + postId,
            data: { id: userId},
        })
        .then((res) => {
            dispatch({ type: LIKE_POST_UNLIKE_POST, payload: { postId, userId }});
        })
        .catch((err) => console.log(err));
    }
}



export const updatePost = (postId, description) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}post/` + postId,
            data: {description},
        })
        .then((res) => {
            dispatch({ type: UPDATE_POST, payload: {description, postId}});
        })
        .catch((err) => console.log(err));
    }
}

export const deletePost = (postId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}post/` + postId,
        })
        .then((res) => {
            dispatch({ type: DELETE_POST, payload: { postId }});
        })
        .catch((err) => console.log(err));
    }
}

export const addComment = (postId, commenterId, text, commenterPseudo) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}post/comment-post/` + postId,
            data: {idOfCommenter:commenterId, pseudoOfCommenter: commenterPseudo, text: text},
        })
        .then((res) => {
            dispatch({ type: ADD_COMMENt, payload: {postId}})
        })
        .catch((err) => console.log(err));
    }
}

export const editComment = (postId, commentId, text) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}post/edit-comment-post/` + postId,
            data: {commentId:commentId, text: text},
        })
        .then((res) => {
            dispatch({ type: EDIT_COMMENt, payload: {postId, commentId, text}})
        })
        .catch((err) => console.log(err));
    }
}

export const deleteComment = (postId, commentId) => {
    return (dispatch) => {
        return axios({
            method: "patch",
            url: `${process.env.REACT_APP_API_URL}post/delete-comment-post/` + postId,
            data: {commentId},
        })
        .then((res) => {
            dispatch({ type: DELETE_COMMENT, payload: {postId, commentId}});
        })
        .catch((err) => console.log(err));
    }
}

