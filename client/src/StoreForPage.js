import React, { useState } from "react";

const initialState = {
    messagePage: false,
    profilPage: false,
    friendPage:false,
    conversation: null
};

export const ContextPage = React.createContext();

const StoreForPage = ({ children }) => {
    const [pageState, setPageState] = useState(initialState);

    return (
        <ContextPage.Provider value={[pageState, setPageState]} >{children}</ContextPage.Provider>
    )
}

export default StoreForPage;