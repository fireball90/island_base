import React from 'react';
import '../market/market.css';
import { Link } from "react-router-dom";

export function Market() {
  return  <div className='market-all'>
            <div className='market-container'>

            <Link to="/management"><img className="market-close" alt="Bezárás" title='Bezárás' src='../images/ui/close.png'></img></Link>

              <div className= "container-fluid">
                <div className='d-flex justify-content-center align-items-center' style={{height:"700px"}}>

                  <div className='col-12 align-items-center d-flex justify-content-center' >
                    <div className='container'>

                      <div className='row justify-content-md-center'>
                        <div className='col-12 text-center'>
                          <h3>Jelenlegi hirdetések a piacon</h3>
                        </div>
                      </div>

                      <div className='row'>
                        <div className='market-listings-container'>
                          <div className='listing-container container'>
                            <div className='row d-flex align-items-center justify-content-center' style={{height:"100px"}}>

                              <div className='col-3 text-center'>
                                <p><img src="../images/icons/wood.png"alt="wood"></img>Fa</p>
                                <p>210 db</p>
                              </div>
                              <div className='col-3 text-center'>
                                <img src="../images/tradeoffer.png" alt='Trade-offer'></img>
                              </div>
                              <div className='col-3 text-center'>
                                <p><img src="../images/icons/steel.png"alt="steel"></img>Vas</p>
                                <p>69 db</p>
                              </div>
                              <div className='col-3 text-center'>
                                <button className='btn btn-warning'>Csere</button>
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
                <button className="market-btn" onClick="">Összes hirdetés</button>
                <button className="market-btn" onClick="">Saját hirdetés</button>
                <Link to="/sell"><button className="market-btn">Hirdetés feladása</button></Link>  
              </div>

            </div>
          </div>
}



export default Market;