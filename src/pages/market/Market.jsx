import React from 'react';
import '../market/market.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import DefaultPage from "../../components/default-page/DefaultPage";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import { Button } from 'react-bootstrap';

export function Market() {
  const [isLoading, setIsLoading] = useState(false)
  return isLoading ? (
    <LoadingScreen loadingMessage={'Itt hamarosan elérhető lesz a sziget választás...'} />
  ) :
    (
      <DefaultPage
        navigations={[
          <Button className="market-btn">Összes hirdetés</Button>,
          <Button className="market-btn">Saját hirdetés</Button>,
          <Button className="market-btn"><Link to="/sell">Hirdetés feladása</Link></Button>
        ]}
        title="Jelenlegi piaci hirdetések"
      >
        <div className="container-fluid">
          <div className='d-flex justify-content-center align-items-center' style={{ height: "700px" }}>

            <div className='col-12 align-items-center d-flex justify-content-center' >
              <div className='container'>

                <div className='row'>
                  <div className='market-listings-container'>
                    <div className='listing-container container'>
                      <div className='row d-flex align-items-center justify-content-center' style={{ height: "100px" }}>

                        <div className='col-3 text-center'>
                          <p><img src="../images/icons/wood.png" alt="wood"></img>Fa</p>
                          <p>210 db</p>
                        </div>
                        <div className='col-3 text-center'>
                          <img src="../images/tradeoffer.png" alt='Trade-offer'></img>
                        </div>
                        <div className='col-3 text-center'>
                          <p><img src="../images/icons/steel.png" alt="steel"></img>Vas</p>
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

      </DefaultPage>
    )
}



export default Market;