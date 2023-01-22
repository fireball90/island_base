import React from 'react';
import '../pwreset/pwreset.css';

export function Pwreset() {
  return <div className='d-flex justify-content-center align-items-center'>
          <div className='pwreset-container'>
              <div className=''>
                  <img className='pwreset-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
              </div>
                <form id="form" className="">
                  <div className="form-group row pb-3">
                    <label className="col-form-label">REGISZTRÁLÁSNÁL HASZNÁLT EMAIL CÍM</label>
                    <div className="col-sm-6">
                      <input type="email" name="email" className="form-control" />
                    </div>
                  </div>
                    <button type="submit" className='btn btn-button2'>Küldés</button>
                </form>
              <div className=''>
                  <p className='ml-auto'><a href='/register'>Visszatérés a login felületre</a></p>
              </div>
          </div>
        </div>
     
}

export default Pwreset;
