import React, { useEffect, useState } from 'react';
import Routes from "./components/Routes";
import { UidContext } from './components/AppContext';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import Store from './Store';
import StoreForPage from './StoreForPage';
import StoreFriend from './StoreFriend';

const App = () => {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();
  

  useEffect(() =>{
    const fetchToken = async () => {
      await axios({
        method: "get",
        url:`${process.env.REACT_APP_API_URL}jwtid`,
        withCredentials: true,
      })
      .then((res) => {
        setUid(res.data);
      })
      .catch((err) => console.log("no token"));
    };
    fetchToken();


    if(uid) dispatch(getUser(uid));
  }, [uid, dispatch]);
  
  


  return (
      <UidContext.Provider value={uid}>
        <StoreForPage>
          <StoreFriend>
            <Store>
              <Routes />
            </Store>
          </StoreFriend>
        </StoreForPage>
      </UidContext.Provider>  
  );
};

export default App;