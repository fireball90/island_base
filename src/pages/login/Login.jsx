import React from 'react';
import '../login/login.css';

export function Login() {
  return  <div className='d-flex justify-content-center align-items-center'>
            <div className='login-container'>
                <div className=''>
                    <img className='login-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
                </div>
                  <form id="form" className="">
                    <div className="form-group row pb-3">
                      <label className="col-form-label">NÉV</label>
                      <div className="col-sm-6">
                        <input type="text" name="username" className="form-control" />
                      </div>
                    </div>
                    <div className="form-group row pb-3">
                      <label className="col-form-label">JELSZÓ</label>
                      <div className="col-sm-6">
                        <input type="password" name="password" className="form-control" />
                      </div>
                    </div>
                      <button type="submit" className='btn btn-button1'>Belépés</button>
                  </form>
                <div className=''>
                    <p className='ml-auto'><a href='/register'>Még nem regisztrált? Kattintson ide!</a></p>
                    <p className='ml-auto'><a href='/pwreset'>Elfelejtette a jelszavát?</a></p>
                </div>
            </div>
          </div>
     
}


export default Login;