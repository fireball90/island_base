import React from 'react';
import '../notifications/notifications.css'
import { Link } from "react-router-dom";

export function Notifications() {
  return <div className='not-all'>
            <div className='not-container'>

            <Link to="/management"><img className="not-close" alt="Bezárás" title='Bezárás' src='../images/ui/close.png'></img></Link>

                <div className= "container-fluid">
                <div className='d-flex justify-content-center align-items-center' style={{height:"700px"}}>

                    <div className='col-12 align-items-center d-flex justify-content-center' >
                    <div className='container'>

                        <div className='row justify-content-md-center'>
                            <div className='col-12 text-center'>
                                <h3>Értesítések</h3>
                            </div>
                        </div>

                        <div className='row'>
                        <div className='not-listings-container'>
                            <div className='not-list-container container'>
                            <div className='row d-flex align-items-center justify-content-center' style={{height:"250px"}}>

                                <div className='col-3 text-center'>
                                    <h3>Nyert csata</h3>
                                </div>
                                <div className='col-3 text-center'>
                                <p><img src="../images/icons/wood.png"alt="wood"></img>Fa - 56 db</p>
                                <p><img src="../images/icons/stone.png"alt="stone"></img>Kő - 55 db</p>
                                <p><img src="../images/icons/steel.png"alt="steel"></img>Vas- 25 db</p>
                                <p><img src="../images/icons/coin.png"alt="coin"></img>Coin - 523 db</p>
                                <p><img src="../images/icons/coin.png"alt="xp"></img>XP - 677 pont</p>
                                </div>
                                <div className='col-3 text-center'>
                                    <h4>Időpont:</h4>
                                    <p>2023 - 01 - 22</p>
                                </div>
                                <div className='col-3 text-center'>
                                    <button className='not-btn2'>Törlés</button>
                                </div>

                            </div>
                            </div>
                        </div>
                        </div>

                    </div>
                    </div>

                </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <Link to="/sell"><button className="not-btn">Vissza</button></Link>  
                </div>

            </div>
        </div>
}


export default Notifications;