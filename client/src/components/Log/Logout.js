import React from 'react';
import axios from 'axios';
import cookie from "js-cookie";


const Logout = () => {

    const removeCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, { expire:1 });
        }
    }

     const logout = async () => {
        await axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URL}user/logout`,
            withCredentials: true,
        })
            .then(() => {
                removeCookie('jwt');
                window.location = '/login';
            })
            .catch((err) => console.log(err));
        window.location= "/login"
    }


    return (
        <li onClick={logout}>
            <img src='./img/icons/logout.svg' title='logout' alt='logout' style={{height:'40px', marginTop:'10px'}}/>
        </li>
    );
};

export default Logout;