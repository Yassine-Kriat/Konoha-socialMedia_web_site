import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { UidContext } from "../components/AppContext";
import Thread from "../components/Thread";

import Login from './Login';
import Following from '../components/Following';
import Followers from '../components/Followers';
import { ContextPage } from '../StoreForPage';
import Message from './Message';
import Profil from '../components/Profil/Profil';
import FriendProfil from '../components/Profil/FriendProfil';



const Home = () => {

    const uid = useContext(UidContext);
    const [pageState, setPageState] = useContext(ContextPage);


    return (
        <>
        {uid ? (
            <>
            <Navbar />
            {pageState.messagePage===false && pageState.profilPage===false && pageState.friendPage===false &&
            <section>
                <div className="gap gray-bg">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-12"> 
                                <div className="row" id="page-contents">
                                    <Following />
                                    <Thread />
                                    <Followers />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            }
            {pageState.messagePage===true && pageState.profilPage===false && pageState.friendPage===false &&
                <Message />
            }
            {pageState.profilPage===true && pageState.messagePage===false && pageState.friendPage===false &&
                <Profil />
            }
            {pageState.friendPage===true && pageState.profilPage===false && pageState.messagePage===false && 
                <FriendProfil />
            }
            </>
        ) : (
            <Login />
        )}
        </>
    );
};

export default Home;