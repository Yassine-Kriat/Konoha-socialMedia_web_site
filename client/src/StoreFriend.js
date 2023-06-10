import React, { useState } from "react";

const initialState = {
    friend: null
};

export const ContextFriendPage = React.createContext();

const StoreFriend = ({ children }) => {
    const [friendState, setFriendState] = useState(initialState);

    return (
        <ContextFriendPage.Provider value={[friendState, setFriendState]} >{children}</ContextFriendPage.Provider>
    )
}

export default StoreFriend;