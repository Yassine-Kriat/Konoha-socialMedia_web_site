import { DELETE_COMMENT, DELETE_POST, EDIT_COMMENt, GET_POSTS, LIKE_POST_UNLIKE_POST, UPDATE_POST } from "../actions/post.actions";

const initialState = {};




export default function postReducer(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return action.payload;
        case LIKE_POST_UNLIKE_POST:
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                    if(!post.likers.includes(action.payload.userId)){
                        return {
                            ...post,
                            likers: [action.payload.userId, ...post.likers],
                        };
                    }else {
                        return {
                            ...post,
                            likers: post.likers.filter((id) => id!==action.payload.userId)
                        }

                    }    
                }
                return post;
            });
        case UPDATE_POST:
            return state.map((post) => {
                if (post._id===action.payload.postId) {
                    return {
                        ...post,
                        description: action.payload.description,
                    }
                }else return post;
            });
        case DELETE_POST:
            return state.filter((post) => post._id !== action.payload.elementId);
        case EDIT_COMMENt:
            return state.map((post) => {
                if(post._id===action.payload.postId) {
                    return {
                        ...post,
                        Commentaires: post.Commentaires.map((comment) => {
                            if(comment._id===action.payload.commentId){
                                return {
                                    ...comment,
                                    text: action.payload.text
                                }
                            }else {
                                return comment;
                            }
                        })
                    }
                }else {
                    return post;
                }
            });
        case DELETE_COMMENT:
            return state.map((post) => {
                if(post._id===action.payload.postId) {
                    return {
                        ...post,
                        Commentaires: post.Commentaires.filter(
                            (comment) => comment._id!==action.payload.commentId
                        ),
                    };
                }else return post;
            });
        default: 
            return state;
    }

}