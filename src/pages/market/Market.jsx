import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Badge } from 'react-bootstrap';
import '../market/market.css';

export function Market() {
  return <div className='market-container'>
            <div className= "container-fluid">
              <div className='row 'style={{height:"700px"}}>

                <div className='col-8 border align-items-center d-flex justify-content-center' >
                  <div className='container'>               
                    <div className='row justify-content-md-center'>
                      <div className='text-center'>
                        <h3>Jelenlegi hirdetések a piacon</h3>
                      </div>
                    </div>
                    <div className='row'>
                        <div className='market-listings-container'>
                          <div className='listing-container container'>
                            <div className='row'>
                              <div className='col-2'>
                                <p>A feladó hirdetése:</p>
                              </div>
                              <div className='col-2'>
                                <p><img src="../images/icons/wood.png"alt="wood-img"></img>Fa</p>
                                <p>210 db</p>
                              </div>
                              <div className='col-2'>
                                <img src="../images/tradeoffer.png" alt='Trade-offer-image'></img>
                              </div>
                              <div className='col-2'>
                                <p>Az ára:</p>
                              </div>
                              <div className='col-2'>
                                <p><img src="../images/icons/steel.png"alt="steel-img"></img>Vas</p>
                                <p>69 db</p>
                              </div>
                              <div className='col-2'>
                                <button className='btn btn-danger'>Csere</button>
                                <button className='btn btn-dark'>Töröl</button>
                              </div>
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>

                <div className='col-4 border d-flex align-items-center justify-content-center flex-column'>
                  <h3>Hirdetés feladása</h3>
                    <form id='form' className='row'>
                      <div className='justify-content-center'>
                          <label className='col-sm-12 col-form-label text-center'>Válassz anyagot:</label>
                        <select id="yourItems" name="yourItems" className='form-select'>
                          <option value="wood">Fa</option>
                          <option value="stone">Kő</option>
                          <option value="steel">Vas</option>
                          <option value="coin">Érmék</option>
                        </select>
                        <label className='col-sm-12 col-form-label text-center'>Válassz mennyiséget:</label>
                        <input type="number" name="yourPiece" className='form-control'></input>
                      </div>
                      <div className='justify-content-center'>
                        <label className='col-sm-12 col-form-label text-center'>Mit kérsz cserébe:</label>
                        <select id="theirItems" name="theirItems" className='form-select'>
                          <option value="wood">Fa</option>
                          <option value="stone">Kő</option>
                          <option value="steel">Vas</option>
                          <option value="coin">Érmék</option>
                        </select>
                        <label className='col-sm-12 col-form-label text-center'>Mennyit kérsz cserébe:</label>
                        <input type="number" name="theirPiece" className='form-control'></input>
                        <div className='d-flex justify-content-center'>
                          <button className='btn btn-danger'>Hirdetés feladása</button>
                        </div>
                      </div>
                    </form>
                  <h3>Saját anyagok</h3>
                  <div className='d-flex col-sm-12 row'>
                  <ListGroup variant="flush" className="text-center">
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent"
                        >
                            Vas
                            <Badge bg="danger" pill>
                            1500
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent"
                        >
                            Kő
                            <Badge bg="danger" pill>
                            255
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent"
                        >
                            Fa
                            <Badge bg="danger" pill>
                            3311
                            </Badge>                       
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent"
                        >
                            Érmék
                            <Badge bg="danger" pill>
                            563
                            </Badge>                       
                        </ListGroup.Item>
                    </ListGroup>
                  </div>
                </div>

              </div>
            </div>
        </div>
     
}



export default Market;