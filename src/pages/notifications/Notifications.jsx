import React from 'react';
import '../notifications/notifications.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import DefaultPage from "../../components/default-page/DefaultPage";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import { Button } from 'react-bootstrap';


export function Notifications() {
    const [isLoading, setIsLoading] = useState(false)
    return isLoading ? (
        <LoadingScreen loadingMessage={'Itt hamarosan elérhető lesz a sziget választás...'} />
    ) :
    (
        <DefaultPage 
            navigations={[
                
            ]}
            title="Értesítések"
        >
                <div className="container-fluid">
                    <div className='' style={{ height: "100%" }}>

                        <div className='col-12 align-items-center d-flex justify-content-center' >
                            <div className='container'>
                                <div className='row'>
                                        <div className='not-list-container container'>
                                            <div className='row d-flex align-items-center justify-content-center' style={{ height: "200px" }}>

                                                <div className='col-3 text-center'>
                                                    <h4>Nyert csata</h4>
                                                </div>
                                                <div className='col-3 text-center'>
                                                    <p><img src="../images/icons/wood.png" alt="wood"></img>Fa - 56 db</p>
                                                    <p><img src="../images/icons/stone.png" alt="stone"></img>Kő - 55 db</p>
                                                    <p><img src="../images/icons/steel.png" alt="steel"></img>Vas- 25 db</p>
                                                    <p><img src="../images/icons/coin.png" alt="coin"></img>Coin - 523 db</p>
                                                    <p><img src="../images/icons/coin.png" alt="xp"></img>XP - 677 pont</p>
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
        </DefaultPage>
    )

}


export default Notifications;