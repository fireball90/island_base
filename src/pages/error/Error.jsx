import React from 'react';
import '../error/error.css';

export function Error() {
  return  <div className='d-flex justify-content-center align-items-center'>
            <div className='error-container justify-content-center d-flex '>
              <div className='d-flex align-items-center flex-column'>
                <div className=''>
                    <img className='error-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
                </div>
                <div className='error-div'></div>                 
                <div className='d-flex justify-content-center'>
                    <p className='ml-auto error-link'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href='/login'>A keresett oldal nem található.<br/> Kérjük kattintson ide a bejelentkezéshez!</a></p>
                </div>
              </div>
            </div>
          </div>
     
}


export default Error;