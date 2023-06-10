import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ContextPage } from '../StoreForPage';
import { ContextFriendPage } from '../StoreFriend';
import FollowHandler from './FollowHandler';
import { isEmpty } from './Utils';

const FriendsOfYourFriend = () => {
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const [pageState, setPageState] = useContext(ContextPage);
    const [friendState, setFriendState] = useContext(ContextFriendPage);

    return (
        <>
            <div className="col-lg-3">
                <aside className="sidebar static">
                    <div className="widget stick-widget">
                        <h4 className="widget-title">Les amis de {friendState.pseudo}</h4>
                        <ul className="followers scroll">
                        <>
                            {!isEmpty(usersData[0]) && !isEmpty(friendState) && usersData.map((user) =>{
                                if((friendState.followers.includes(user._id) || friendState.following.includes(user._id)) ) {
                                    return (
                                        <>
                                        <li key={user._id}>
                                            <figure>
                                                <img src={user.picture} alt=""/>
                                            </figure>
                                            <div className="friend-meta">
                                                <h4 onClick={()=>{
                                                        if (user._id===userData._id) {
                                                            setFriendState(null); setPageState({messagePage: false, profilPage: true,friendPage:false, conversation:pageState.conversation})
                                                        }else{
                                                            setFriendState(user); setPageState({messagePage: false, profilPage: false,friendPage:true, conversation:pageState.conversation})
                                                        }
                                                    }}>{user.pseudo}
                                                </h4>
                                                {userData._id!==user._id &&
                                                    <FollowHandler idToFollow={user._id}/>
                                                }
                                            </div>
                                        </li>
                                    </>

                                    );
                                } else {
                                    return null
                                }

                            })
                            }
                            </>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    );
};

export default FriendsOfYourFriend;