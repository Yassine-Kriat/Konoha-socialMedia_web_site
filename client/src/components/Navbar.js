import React, { useContext, useState }/*, { useContext }*/ from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import logo from "../pages/konoha.png";
import { ContextPage } from '../StoreForPage';
import Logout from './Log/Logout';


const Navbar = () => {
    const userData = useSelector((state) => state.userReducer);
    const [pageState, setPageState] = useContext(ContextPage);

    return (
        <div className="topbar stick">
            <div className="logo" >
                <a href='/'>
                    <img src={logo} style={{width: '50px', height: '50px'}} alt="logo"/> KONOHA
                </a>
            </div>
            <div className="top-area">
                <ul>
                    
                    <li>
                        <a href="/" title="Home" data-ripple=""><img src='./img/icons/home.svg' title='new user' alt='new user' style={{float:'left'}}/></a>
                    </li>
                    <li className="li-nav" onClick={()=>{
                        const e = {messagePage: true, profilPage: false,friendPage:false, conversation:pageState.conversation}
                        setPageState(e)
                        }}>
                        <img src='./img/icons/icons8-comments-48.png' title='message' alt='message' style={{float:'left'}}/>
                    </li>
                    <li onClick={()=>{
                        const e = {messagePage: false, profilPage: true, friendPage:false, conversation:pageState.conversation}
                        setPageState(e)
                        }}>
                        <img src={userData.picture} title='profil' alt='profil' style={{float:'left', height:'40px', width:'45px', borderRadius:"100%", marginTop:"10px"}}/><br/>
                        {/*userData.pseudo*/}
                    </li>
                    <Logout />
                    
                </ul>
            </div>
        </div>
    );
};

export default Navbar;