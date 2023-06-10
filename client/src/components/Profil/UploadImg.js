import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPicture } from '../../actions/user.actions';

const UploadImg = () => {
    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector(( state) => state.userReducer);

    const handlePicture = (e) => {
        const data = new FormData();
        data.append("userId", userData._id);
        data.append("file", file);
        dispatch(uploadPicture(data, userData._id));
    }

    return (
        <>
        <form action='' onSubmit={handlePicture} className="edit-phto" >
                <i className="fa fa-camera-retro"></i>
                <label htmlFor='file' className="fileContainer">
                    changer le profil
                <input
                    type="file"
                    id='file'
                    name='file'
                    accept='.jpg, .jpeg, .png'
                    onChange={(e) => setFile(e.target.files[0])}
                />
                </label>
                <br/>
                {file && <button type="submit">Appliquer</button>}
        </form>
        </>
    );
};

export default UploadImg;