import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadCover } from '../../actions/user.actions';

const UploadCoverImg = () => {
    const [coverFile, setCoverFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector(( state) => state.userReducer);

    const handleCover = (e) => {
        const data = new FormData();
        data.append("userId", userData._id);
        data.append("file", coverFile);
        dispatch(uploadCover(data, userData._id));
    }

    return (
        <form action='' onSubmit={handleCover} className="edit-phto">
			<i class="fa fa-camera-retro"></i>
			<label htmlFor='coverFile' className="fileContainer">
				modifier la couverture
			<input 
                type="file"
                id='coverFile'
                name='coverFile'
                accept='.jpg, .jpeg, .png'
                onChange={(e) => setCoverFile(e.target.files[0])}
            />
			</label>
            <br/>
            {coverFile && <button type="submit" >Appliquer</button>}
		</form>
    );
};

export default UploadCoverImg;