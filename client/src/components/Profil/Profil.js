import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio, UPDATE_BIO } from '../../actions/user.actions';
import Following from '../Following';
import UploadCoverImg from './UploadCoverImg';
import UploadImg from './UploadImg';
import Followers from '../Followers';
import CreatePostForm from '../Post/CreatePostForm';
import { isEmpty } from '../Utils';
import Card from '../Post/Card';
import { getPosts } from '../../actions/post.actions';
import { ContextPage } from '../../StoreForPage';
import { ContextFriendPage } from '../../StoreFriend';


const Profil = () => {
    
    const userData = useSelector((state) => state.userReducer);
    const posts = useSelector((state) => state.postReducer);
    //const usersData = useSelector((state) => state.usersReducer);
    const [bio, setBio] = useState("");
    const [updateForm, setUpdateForm] = useState(false);
    const dispatch = useDispatch();
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const [pageState, setPageState] = useContext(ContextPage);
    const [friendState, setFriendState] = useContext(ContextFriendPage);
    

    const handleUpdate =  () => {
        const data = {"bio":bio};
        console.log(data)
        //dispatch(updateBio(userData._id, bio));
        try {
			axios.put(`${process.env.REACT_APP_API_URL}user/`+userData._id, data);
            dispatch({type: UPDATE_BIO, payload: bio})
		} catch (err) {
			console.log(err);
		}
        setUpdateForm(!updateForm)
    }


    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement.scrollHeight) {
            setLoadPost(true);
        }
    }

    useEffect(() => {
        if(loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost, dispatch, count]);

    return (
        
            <>
            <section>
                <div className="feature-photo">        
                    <figure>
                        <img src={userData.cover} alt=""/>
                    </figure>
                    <UploadCoverImg />
                    <div className="container-fluid">
                        <div className="row merged">
                            <div className="col-lg-2 col-sm-3">
                                <div className="user-avatar">
                                    <figure>
                                        <img src={userData.picture} alt=""/>
                                        <UploadImg />
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

                                    <Following />

                                    <div className="col-lg-6">
                                        
                                        <div className="central-meta item">
                                            <div className="new-postbox">
                                                <div className="newpst-input">

                                                    {updateForm === false && (
                                                        <>
                                                            <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio.lenght===0 ? "Definis ta bio ici" : userData.bio}</p>
                                                            <div className="attachments">
                                                                <form>
                                                                    <button onClick={() => setUpdateForm(!updateForm)}>modifier votre bio</button>
                                                                </form>
                                                                
                                                            </div>
                                                        </>
                                                    )}
                                                    {updateForm && (
                                                        <>
                                                            <form>
                                                                <textarea type="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                                                                <div className="attachments">
                                                                    <button onClick={handleUpdate}>Valider</button>
                                                                </div>
                                                            </form>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <CreatePostForm />
                                        {!isEmpty(posts[0]) &&
                                            posts.map((post) => {
                                                if(post.idOfPoster===userData._id){
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

export default Profil;