import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ContextPage } from '../../StoreForPage';
import { ContextFriendPage } from '../../StoreFriend';
import Followers from '../Followers';
import FollowHandler from '../FollowHandler';
import FriendsOfYourFriend from '../FriendsOfYourFriend';
import Card from '../Post/Card';
import { isEmpty } from '../Utils';

const FriendProfil = () => {
    const [pageState, setPageState] = useContext(ContextPage);
    const [friendState, setFriendState] = useContext(ContextFriendPage);
    const posts = useSelector((state) => state.postReducer);

    return (
        <>
        <section>
            <div className="feature-photo">        
                <figure>
                    <img src={friendState.cover} alt=""/>
                </figure>
                <div className="container-fluid">
                    <div className="row merged">
                        <div className="col-lg-2 col-sm-3">
                            <div className="user-avatar">
                                <figure>
                                    <img src={friendState.picture} alt=""/>
                                    <FollowHandler idToFollow={friendState._id}/>
                                </figure>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="gap gray-bg">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row" id="page-contents">
                                <FriendsOfYourFriend />
                                    <div className="col-lg-6">
                                        <div className="central-meta item">
                                            <div className="new-postbox">
                                                <div className="newpst-input">
                                                    <>
                                                    
                                                    {!isEmpty(friendState) && friendState.bio && <p>{friendState.bio} </p>}
                                                    {!isEmpty(friendState) && !friendState.bio && <p>{friendState.pseudo} n'a pas encore definit sa bio</p>}
                                                    
                                                    </>

                                                </div>
                                            </div>
                                        </div>
                                        {!isEmpty(posts[0]) &&
                                            posts.map((post) => {
                                                if(post.idOfPoster===friendState._id){
                                                    return <Card post={post} key={post._id}/>;
                                                }else{
                                                    return null
                                                }
                                                
                                            }) 
                                        }
                                    </div>
                                <Followers />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    );
};

export default FriendProfil;
