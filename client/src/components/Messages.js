import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { ContextParent } from '../Store';
import { timestampParser } from './Utils';

const Messages = ({message, own}) => {
    const userData = useSelector((state) => state.userReducer);
    const [state, setState] = useContext(ContextParent);
    
    return (
        
        <li class={own ? "me" : "you"}>
            <figure><img src={own ? userData.picture : state.picture} alt=""/></figure>
            <p>{message.text}</p><br/>
            <span>{timestampParser(message.createdAt)}</span>	
		</li>
        
        
    );
};

export default Messages;