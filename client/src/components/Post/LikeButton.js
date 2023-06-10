import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { like_unlike_post } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const LikeButton = ({post}) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const like_unlike = () => {
        dispatch(like_unlike_post(post._id, uid))
        setLiked(!liked);

    }

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked])

    return (
        <>
        <div className='like-container' title="Likes">
            {liked === false && (
                <img src="./img/icons/heart.svg" onClick={like_unlike} alt=''/>
            )}
            {liked === true && (
                <img src="./img/icons/heart-filled.svg" onClick={like_unlike} alt=''/>
            )}
            <ins>
                {post.likers.length}
            </ins>
        </div>
    </>
    );
};

export default LikeButton;