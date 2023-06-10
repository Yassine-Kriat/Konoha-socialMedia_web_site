import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeletePost = (props) => {
    const dispatch = useDispatch();
    const deleteQuote = () => dispatch(deletePost(props.id))

    return (
        <span onClick={() => {
            if(window.confirm("Supprimer ce post ?")) {
                deleteQuote();
            }
        }} style={{float:'right'}}>
            <img src='./img/icons/trash.svg' alt='delete' style={{height:'30px', width:'30px'}}/>
        </span>
    );
};

export default DeletePost;