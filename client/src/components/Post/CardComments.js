import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getPosts } from '../../actions/post.actions';
import { isEmpty, timestampParser } from '../Utils';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ({post}) => {
    const [text, setText] = useState("");
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();

        if(text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''));
        }   
    }


    return (
        <div className="coment-area">
			<ul className="we-comet">
                {post.Commentaires.map((commentaire) => {
                    return (
                        <li key={commentaire._id}>
                            <div className="comet-avatar">
                                <img src={!isEmpty(usersData[0]) && usersData.map((user) => {
                                    if (user._id === commentaire.id0fCommenter) return user.picture;
                                    else return null;
                                    })
                                    .join("")
                                } alt=""/>
                            </div>
                            <div className="we-comment">
                                <div className="coment-head">
                                    <h5><a href="/">{commentaire.pseudoOfCommenter}</a></h5>
                                    <span>{timestampParser(commentaire.timestamp)}</span>
                                </div>
                                <p>
                                    {commentaire.text}
                                </p>
                                <EditDeleteComment comment={commentaire} postId={post._id}/>
                            </div>
                        </li>
                    )
                })}

				<li className="post-comment">
					<div className="comet-avatar">
						<img src={userData.picture} alt=""/>
					</div>
					<div className="post-comt-box">
						<form action='' onSubmit={handleComment}>
							<textarea name="text" onChange={(e) => setText(e.target.value)} value={text} placeholder="commentaire"></textarea>
                            <button type="submit">Envoyer</button>
						</form>	
					</div>
				</li>
			</ul>
		</div>
    );
};

export default CardComments;