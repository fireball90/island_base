import React from 'react';
import '../register/register.css';

export function Register() {
  return <div className='d-flex justify-content-center align-items-center'>
  <div className='register-container'>
      <div className=''>
          <img className='register-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
      </div>
        <form id="form" className="">
          <div className="form-group row pb-3">
            <label className="col-form-label">FELHASZNÁLÓ NÉV</label>
            <div className="col-sm-6">
              <input type="text" name="username" className="form-control" />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-form-label">E-MAIL CÍM</label>
            <div className="col-sm-6">
              <input type="email" name="email" className="form-control" />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-form-label">JELSZÓ</label>
            <div className="col-sm-6">
              <input type="password" name="password" className="form-control" />
            </div>
          </div>
          <div className="form-group row pb-3">
            <label className="col-form-label">JELSZÓ ELLENŐRZÉSE</label>
            <div className="col-sm-6">
              <input type="password" name="pwcheck" className="form-control" />
            </div>
          </div>
            <button type="submit" className='btn btn-button3'>Regisztráció</button>
        </form>
      <div className=''>
          <p className='ml-auto'><a href='/register'>Már regisztrált? Lépjen be!</a></p>
      </div>
  </div>
</div>
}

/* var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var pwdInput = document.getElementById("pwd");
var pwdCheckInput = document.getElementById("pwdCheck");
var usernameVal = usernameInput.value;
var emailVal = emailInput.value;
var pwdVal = pwdInput.value;
var pwdCheckVal = pwdCheckInput.value; */


export default Register;
