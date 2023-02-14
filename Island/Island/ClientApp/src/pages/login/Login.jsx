import React from 'react';
import '../login/login.css';

export function Login() {
  return  <div className='d-flex justify-content-center align-items-center'>
            <div className='login-container justify-content-center d-flex align-items-center'>
              <div className='d-flex align-items-center flex-column'>

                <div className=''>
                    <img className='login-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
                </div>

                <div className=''>
                    <img className='login-img2' alt='BEJELENTKEZÉS' src='../images/bejelentkezes.png'></img>
                </div>

                  <form id="form" className="">
                    <div className="justify-content-center  form-group row pb-3">
                      <label className="col-form-label text-center login-label">NÉV</label>
                      <div className="col-sm-10">
                        <input type="text" name="username" className="form-control login-input" />
                      </div>
                    </div>
                    <div className="justify-content-center  form-group row pb-3">
                      <label className="col-form-label text-center login-label">JELSZÓ</label>
                      <div className="col-sm-10">
                        <input type="password" name="password" className="form-control login-input" />
                      </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                      <button type="submit" className='btn btn-button1'>Belépés</button>
                    </div>
                  </form>

                <div className='d-flex justify-content-center'>
                    <p className='ml-auto login-link'><a href='/register'>Még nem regisztrált? Kattintson ide!</a></p>
                </div>

                <div className='d-flex justify-content-center'>
                  <p className='ml-auto login-link'><a href='/pwreset'>Elfelejtette a jelszavát?</a></p>
                </div>
                
              </div>
            </div>
          </div>    
}


export default Login;