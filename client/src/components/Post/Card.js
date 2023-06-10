import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/post.actions';
import DeletePost from './DeletePost';
import CardComments from './CardComments';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const updateItem =  () => {
        if(textUpdate) {
            dispatch(updatePost(post._id, textUpdate))
        }
        setIsUpdated(false);
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);

    }, [usersData])

    return (
        <div className="central-meta item" key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                
                <div className="user-post">
					<div className="friend-info">
						<figure>
							<img 
                                src={
                                    !isEmpty(usersData[0]) &&
                                    usersData.map((user) => {
                                        if(user._id===post.idOfPoster) return user.picture
                                        else return null
                                    }).join('')
                            } alt=""/>
                            
						</figure>
						<div className="friend-name">
							<ins>
                                <a href="/" title="">
                                    {!isEmpty(usersData[0]) &&
                                        usersData.map((user) => {
                                            if(user._id===post.idOfPoster) return user.pseudo
                                            else return null
                                        }).join('')
                                    }
                                </a>
                            </ins>
							<p>
                                <span>{dateParser(post.createdAt)}</span>
                                {userData._id===post.idOfPoster && (
                                    <>
                                        <DeletePost id={post._id}/>
                                        <span onClick={() => setIsUpdated(!isUpdated)} style={{float:'right'}}>
                                            <img src='./img/icons/edit.svg' alt='' style={{height:'30px', width:'30px'}}/>
                                        </span>
                                            
                                    </>
                                )}
                            </p>
						</div>
						<div className="post-meta">
							<div className="description">
								{isUpdated===false && <p>{post.description}</p>}	
								{isUpdated && (
                                    <div className='update-post'>
                                        <form>
                                        <textarea 
                                            defaultValue={post.description}
                                            onChange={(e) => setTextUpdate(e.target.value)}
                                        />
                                        <div className='attachments'>
                                            <ul>
                                                <li>
                                                    <button onClick={updateItem} style={{marginLeft:'10px'}}>
                                                        valider
                                                    </button>
                                                </li>
                                            </ul>
                                            
                                        </div>

                                        </form>
                                    

                                    </div>
                                )}
							</div>
                            
                            {post.picture && (
                                <img src={post.picture} alt=""/>
                            )}

							<div className="we-video-info">
								<ul>
									<li>
										<div className="like-container"  title="Comments">
											
                                            <img src="./img/icons/icons8-messaging-30.png" onClick={() => setShowComment(!showComment)} alt=''/>
										    <ins>
                                                {post.Commentaires.length}
                                            </ins>
                                        </div>
										
									</li>
									<li>
                                        <LikeButton post={post}/>
										
										
									</li>
								</ul>
							</div>
						</div>
					</div>


					{showComment && <CardComments post={post} />}
                    
                    
				</div>

            )}
        </div>
    );
};

export default Card;