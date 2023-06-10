import React from 'react';
import Log from '../components/Log';
import logo from './konoha.png';

const Login = () => {
    return (
        <div className="theme-layout">
            <div className="container-fluid pdng0">
                <div className="row merged">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <div className="land-featurearea">
                            <div className="land-meta">
                                <h1>Bienvenue sur KONOHA</h1>
                                <div className="friend-logo">
                                    <img src={logo} style={{height: '250px', width: '250px'}} alt=""/>
                                </div>
                                <h3 className="folow-me">Rejoins nous vite si tu n'es pas encore inscrit !</h3>
                            </div>	
                        </div>
                    </div>
                    <Log />
                </div>
            </div>
        </div>    
    );
};

export default Login;