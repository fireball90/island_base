import React from 'react';
import './Navbar.css';
import { Outlet, Link } from "react-router-dom";



const  Navigation = () => {
    return (
        <>
        <nav className="nav-container">
            <div className="nav-header">
                        <img className='nav-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
            </div>
            <div className="nav-links">    
                <ul>       
                    <li><Link to="/management">Menedzselés</Link></li>   
                    <li><Link to="/war">Csata</Link></li>
                    <li><Link to="/expedition">Expedíció</Link></li>
                    <li><Link to="/market">Piac</Link></li>
                    <li><Link to="/tutorial">Útmutató</Link></li>
                    <li><Link to="/notifications">Értesítések</Link></li>
                    <li><Link to="/login">Kilépés</Link></li>
                    <li><Link to="/myprofile">Saját fiók</Link></li>
                    <li><Link to="/myprofile"><img alt='ProfilePic'></img></Link></li>                                   
                </ul>
            </div>
        </nav>
        <Outlet />
        </>
    )
}
    

export default Navigation;

