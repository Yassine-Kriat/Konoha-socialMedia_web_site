import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { isEmpty } from './Utils';
import { ContextParent } from '../Store';

const Conversation = ({conversation, currentUser}) => {
    const [user, setUser] = useState(null);
    const [state, setState] = useContext(ContextParent);

    useEffect(() => {
		const friendId = conversation.membres.find((m)=> m!==currentUser._id);

        const getUser = async () => {
			try {
				const res = await axios.get(`${process.env.REACT_APP_API_URL}user/${friendId}`);
				setUser(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		getUser();
	}, [currentUser,conversation]);
    
    
    return (
        <>  
            {user &&
                <li key={conversation._id}>
                    <figure><img src={user.picture} alt=""/></figure>
                    <div class="people-name">
                        <span>{user.name}</span>
                    </div>
                </li>
            }
        </>
    );
};

export default Conversation;