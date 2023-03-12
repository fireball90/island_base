import React, { useContext } from 'react';
import { Outlet, Link, useNavigate } from "react-router-dom";
import { PlayerContext, UserContext } from '../../App';
import { Button } from 'react-bootstrap';
import { Cookies } from 'react-cookie';

import style from './Hud.module.css';
import ExperienceBar from '../experience-bar/ExperienceBar';
import ProfileImage from '../profile-image/ProfileImage';


export default function Hud() {
    const { isLogined, setIsLogined, setUser } = useContext(UserContext);
    const { player } = useContext(PlayerContext)

    const navigate = useNavigate()
    const cookie = new Cookies()

    function handleLogout() {
        cookie.remove('token')

        setIsLogined(false)
        setUser('', '')

        navigate('')
    }

    return isLogined ? (
        <div className={style.layout}>
            <div className={style.hudTop}>
                <div className={style.items}>
                    <img alt='Érme' title='Érme' src='../images/ui/coin_ui_2.png'></img>
                    <div className={style.itemsText}>
                        <h4>{player.coins}</h4>
                    </div>
                </div>
                <div className={style.items}>
                    <img alt='Vas' title='Vas' src='../images/ui/steel_ui_2.png'></img>
                    <div className={style.itemsText}>
                        <h4>{player.irons}</h4>
                    </div>
                </div>
                <div className={style.items}>
                    <img alt='Kő' title='Kő' src='../images/ui/stone_ui_2.png'></img>
                    <div className={style.itemsText}>
                        <h4>{player.stones}</h4>
                    </div>
                </div>
                <div className={style.items}>
                    <img alt='Fa' title='Fa' src='../images/ui/wood_ui_2.png'></img>
                    <div className={style.itemsText}>
                        <h4>{player.woods}</h4>
                    </div>
                </div>
            </div>
            <div className={style.hudLeft}>
                <div className={style.playerInformation}>
                    <ProfileImage />
                    <ExperienceBar experiencePoints={player.experience} />
                </div>
                <nav>
                    <Link to="/management">
                        <img alt="Menedzsment" title='Menedzsment' src='../images/ui/management.png'></img>
                    </Link>
                    <Link to="/management">
                        <img alt="Építés" title='Építés' src='../images/ui/build.png'></img>
                    </Link>
                    <Link to="/war">
                        <img alt="Csata" title='Csata' src='../images/ui/war.png'></img>
                    </Link>
                    <Link to="/expedition">
                        <img alt="Expedíció" title='Expedíció' src='../images/ui/expedition.png'></img>
                    </Link>
                    <Link to="/market">
                        <img alt="Piac" title='Piac' src='../images/ui/market.png'></img>
                    </Link>
                    <Link to="/tutorial">
                        <img alt="Útmutató" title='Útmutató' src='../images/ui/tutorial.png'></img>
                    </Link>
                    <Link to="/notifications">
                        <img alt="Értesítések" title='Értesítések' src='../images/ui/notification.png'></img>
                    </Link>
                    <button onClick={() => handleLogout()}>
                        <img alt="Kijelentkezés" title='Kijelentkezés' src='../images/ui/logout.png'></img>
                    </button>
                </nav>
            </div>
            <Outlet />
        </div>
    ) : <Outlet />
}