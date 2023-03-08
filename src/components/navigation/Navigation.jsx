import React, { useContext } from 'react';
import './Navigation.css';
import { Outlet, Link } from "react-router-dom";
import { PlayerContext, UserContext } from '../../App';



const Navigation = () => {
    const { isLogined } = useContext(UserContext);
    const { player } = useContext(PlayerContext)

    return (
        <>
            <div className='menu-container'>
                <div className='nav-item-component'>
                    <div>
                        <img alt='Érme' title='Érme' src='../images/ui/coin_ui_2.png'></img>
                        { player.coins }
                    </div>
                    <div>
                        <img alt='Kő' title='Kő' src='../images/ui/stone_ui_2.png'></img>
                        { player.stones }
                    </div>
                    <div>
                        <img alt='Vas' title='Vas' src='../images/ui/steel_ui_2.png'></img>
                        { player.irons }
                   </div>
                    <div>
                        <img alt='Fa' title='Fa' src='../images/ui/wood_ui_2.png'></img>
                        { player.woods }
                    </div>
                </div>
                <nav className="nav-container2">
                    <div className="nav-img-menu">     
                            <Link to="/myprofile"><img className="nav-profile" alt="Saját profil" title='Saját profil' src='../images/ui/indian_ribbon.png'></img></Link>    
                            <Link to="/management"><img className="menupont" alt="Menedzsment" title='Menedzsment' src='../images/ui/management.png'></img></Link>
                            <Link to="/management"><img className="menupont" alt="Építés" title='Építés' src='../images/ui/build.png'></img></Link>  
                            <Link to="/war"><img className="menupont" alt="Csata" title='Csata' src='../images/ui/war.png'></img></Link>
                            <Link to="/expedition"><img className="menupont" alt="Expedíció" title='Expedíció' src='../images/ui/expedition.png'></img></Link>
                            <Link to="/market"><img className="menupont" alt="Piac" title='Piac' src='../images/ui/market.png'></img></Link>
                            <Link to="/tutorial"><img className="menupont" alt="Útmutató" title='Útmutató' src='../images/ui/tutorial.png'></img></Link>
                            <Link to="/notifications"><img className="menupont" alt="Értesítések" title='Értesítések' src='../images/ui/notification.png'></img></Link>
                            <Link to="/login"><img className="menupont" alt="Kijelentkezés" title='Kijelentkezés' src='../images/ui/logout.png'></img></Link>                           
                    </div>
                </nav>
            </div>
            <Outlet />
        </>
    )
}
    
export default Navigation;