import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPLOAD_COVER = "UPLOAD_COVER";
export const UPDATE_BIO = "UPDATE_BIO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";


export const getUser = (uid) => {
    return (dispatch) => {
      return axios
        .get(`${process.env.REACT_APP_API_URL}user/${uid}`)
        .then((res) => {
          dispatch({ type: GET_USER, payload: res.data });
        })
        .catch((err) => console.log(err));
    };
  };


export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}user/upload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture});
          });
      })
      .catch((err) => console.log(err));
  }

}

export const uploadCover = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}user/coverUpload`, data)
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}user/${id}`)
          .then((res) => {
            dispatch({ type: UPLOAD_COVER, payload: res.data.cover});
          });
      })
      .catch((err) => console.log(err));
  }

}

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}user/` + userId,
      data: { bio }
    })
      .then((res) => {
        dispatch({type: UPDATE_BIO, payload: bio})
      })
      .catch((err) => console.log(err))
  }
}

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}user/follow/` + followerId,
      data: { idToFollow }
    })
      .then((res) => {
        dispatch({type: FOLLOW_USER, payload: {idToFollow}});
      })
      .catch((err) => console.log(err))
  }
}

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}user/unfollow/` + followerId,
      data: { idToUnfollow }
    })
      .then((res) => {
        dispatch({type: FOLLOW_USER, payload: {idToUnfollow}});
      })
      .catch((err) => console.log(err))
  }
}



