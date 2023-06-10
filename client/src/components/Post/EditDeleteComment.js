import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({comment, postId}) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState("");
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    const handleEdit = (e) => {
        e.preventDefault();

        if(text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }

    }

    const handleDelete = () => dispatch(deleteComment(postId, comment._id))

    useEffect(() => {
        const checkAUthor = () => {
            if(uid===comment.id0fCommenter){
                setIsAuthor(true);
            }
        }
        checkAUthor();
    }, [uid, comment.id0fCommenter]);

    return (
        <div className='edit-comment'>

            {isAuthor && edit===false && (
                <>
                <span onClick={() => {
                    if(window.confirm("voulez-vous supprimer ce commentaire ?")) {
                        handleDelete();
                    }
                }} style={{float:'right'}}> 
                    <img src='./img/icons/trash.svg' alt='delete' style={{height:"30px", width:'30px'}}/>
                </span>

                <span onClick={() => setEdit(!edit)} style={{float:'right'}}>
                    <img src='./img/icons/edit.svg' alt='' style={{height:"30px", width:'30px'}}/>
                </span>
                </>
            )}
            {isAuthor && edit && (
                <form action='' onSubmit={handleEdit} className='edit-comment-form' >
                    <textarea 
                        type="text" 
                        name='text' 
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                        style={{border:'gray solid'}}
                    /><br/>
                    <div>
                        <button type="submit" style={{float:'right', marginLeft:"13px"}}>Appliquer</button>
                        <button onClick={() => setEdit(!edit)} style={{float:'right'}}>Annuler</button>
                    </div>
                </form>
            )}
            
        </div>
    );
};

export default EditDeleteComment;