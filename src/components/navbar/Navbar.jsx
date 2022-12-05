import React from 'react';
import ReactDOM from 'react-dom';
import './Navbar.css';
import { Outlet, Link } from "react-router-dom";


const  Navigation = () => {
    return (
        <>
        <nav class="nav-container">
            <div class="nav-header">
                        <p>ISLANDERS</p>
            </div>
            <div class="nav-links">    
                <ul>       
                    <li><Link to="/management">Menedzselés</Link></li>   
                    <li><Link to="/war">Csata</Link></li>
                    <li><Link to="/expedition">Expedíció</Link></li>
                    <li><Link to="/market">Piac</Link></li>
                    <li><Link to="/shop">Bolt</Link></li>
                    <li><Link to="/tutorial">Útmutató</Link></li>
                    <li><Link to="/notifications">Értesítések</Link></li>
                    <li><Link to="/login">Kilépés</Link></li>
                    <li><Link to="/myprofile">Saját fiók</Link></li>
                    <li><Link to="/myprofile"><img></img></Link></li>                                   
                </ul>
            </div>
        </nav>
        <Outlet />
        </>
    )
}
    

export default Navigation;

