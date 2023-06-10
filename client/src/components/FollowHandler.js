import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../actions/user.actions';
import { ContextParent } from '../Store';
import { ContextPage } from '../StoreForPage';
import { isEmpty } from './Utils';

const FollowHandler = ({ idToFollow }) => {
    const userData = useSelector((state) => state.userReducer);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch = useDispatch();
    const [pageState, setPageState] = useContext(ContextPage);

    const handleFollow = () => {
        dispatch(followUser(userData._id, idToFollow));
        setIsFollowed(true);
    };

    const handleUnFollow = () => {
        dispatch(unfollowUser(userData._id, idToFollow));
        setIsFollowed(false);
    };

    const handleMessage = async () => {
        const data = {
			"senderId": userData._id,
			"receiverId": idToFollow,
		};
        try {
			const res = await axios.post(`${process.env.REACT_APP_API_URL}conversation/`, data);
            console.log(res.data)
			setPageState({messagePage: true, profilPage: false,friendPage:false, conversation: res.data})
		} catch (err) {
			console.log(err);
		}
        
    }
    

    useEffect(() => {
        if(!isEmpty(userData.following)) {
            if(userData.following.includes(idToFollow)) {
                setIsFollowed(true);
            } else {
                setIsFollowed(false);
            }
        }
    }, [userData, idToFollow]);

    return (
        <>
            
            {isFollowed && !isEmpty(userData) && (
                <span onClick={handleUnFollow} style={{marginLeft:'10px'}}>
                    <img src='./img/icons/checked.svg' alt=''/>
                </span>
            )}
            {isFollowed===false && !isEmpty(userData) && (
                <span onClick={handleFollow} style={{marginLeft:'10px'}}>
                    <img src='./img/icons/check.svg' alt=''/>
                </span>
            )}
            <span onClick={()=>handleMessage()}>
                <img src='./img/icons/icons8-writing-hand-48.png' alt=''/>
            </span>
            
        </>
    );
};

export default FollowHandler;