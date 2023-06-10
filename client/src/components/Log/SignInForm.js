import React, { useState } from 'react';
import axios from "axios";

const SignInForm = () => {
    const [pseudo, setPseudo] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const pseudoError = document.querySelector('.pseudo.error');
        const passwordError = document.querySelector('.password.error');

        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}user/signin`,
            withCredentials: true,
            data: {
                pseudo,
                password
            },
        })
        .then((res) => {
            if (res.data.errors) {
                pseudoError.innerHTML = res.data.errors.pseudo;
                passwordError.innerHTML = res.data.errors.password;   
            } else {
                console.log(res)
                window.location = '/';
            }
        })
        .catch((err) => {
            console.log(err);
        })  

    }

    return (
        <div>
            <h2 className="log-title">Connexion</h2>
            <form action='post' onSubmit={handleLogin}>
                <div className="form-group">	
                    <input 
                        type="text" 
                        id="pseudo" 
                        name='pseudo' 
                        onChange={(e) => setPseudo(e.target.value)} 
                        value={pseudo} 
                        required="required"
                    />
                    <label className="control-label" htmlFor='pseudo'>pseudo</label><i className="mtrl-select"></i>
                </div>
                <div className='pseudo error'></div>
                <div className="form-group">	
                    <input 
                        type="password"
                        id='password'
                        name='password'
                        onChange={(e) => setPassword(e.target.value)} 
                        value={password} 
                        required="required"/>
                    <label className="control-label" htmlFor='password'>mot de passe</label><i className="mtrl-select"></i>
                </div>
                <div className='password error'></div>
                <div className="submit-btns">
                    <button className="mtr-btn" type="submit"><span>valider</span></button><br/>
                </div>
            </form> <br/>     
        </div>
							
    );
};

export default SignInForm;