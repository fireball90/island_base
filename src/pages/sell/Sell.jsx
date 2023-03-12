import React from 'react';
import '../sell/sell.css';
import { Link } from "react-router-dom";
import { useState } from 'react';
import DefaultPage from "../../components/default-page/DefaultPage";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import { Button } from 'react-bootstrap';

export function Sell() {
  const [isLoading, setIsLoading] = useState(false)
  return isLoading ? (
    <LoadingScreen loadingMessage={'Itt hamarosan elérhető lesz a sziget választás...'} />
  ) :
    (
      <DefaultPage
        navigations={[
        ]}
        title="Hirdetés feladása"
      >
        <div className="container-fluid">
          <div className='row'>
            <div className='col-12 d-flex align-items-center justify-content-center flex-column sell-all'>
              <h3>Hirdetés feladása</h3>
              <form id='sell-form' className='row'>
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
                  <div className='d-flex justify-content-center pt-3'>
                    <button className='sell-btn' onClick="">Hirdetés feladása</button>
                  </div>
                </div>
              </form>
            </div>
            <div className='why-tho d-flex justify-content-center align-items-center'>
              <Link to="/market"><button className="market-btn">Mégse</button></Link>
            </div>
          </div>

        </div>
      </DefaultPage>
    )
}


export default Sell;