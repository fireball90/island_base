import React, { useState } from "react";
import '../login/login.css';


export function Login() {
  const [data,setData] = useState({
    username:"",
    password:""
  });
  const {username,password} = data;
  const changeHandler = event => {
    setData({...data,[event.target.name]:[event.target.value]});
  }
  var errorMsgLogin = "";
  const submitHandler = event => {
      event.preventDefault();
        fetch('https://localhost:7276/api/Auth/Login', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          })
          .then(response => response.json())
          .then(data => {
          console.log('Success:', data);
          alert('Sikeres Belépés');
          })
          .catch((error) => {
          console.error('Error:', error);
          errorMsgLogin = "Hibás felhasználónév vagy jelszó!";
          });        
  };
    return  <div className='d-flex justify-content-center align-items-center'>
            <div className='login-container justify-content-center d-flex align-items-center'>
              <div className='d-flex align-items-center flex-column'>

                <div className=''>
                    <img className='login-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
                </div>

                <div className=''>
                    <img className='login-img2' alt='BEJELENTKEZÉS' src='../images/bejelentkezes.png'></img>
                </div>

                  <form id="form" className="" onSubmit={submitHandler}>
                    <div className="justify-content-center  form-group row pb-1">
                      <label className="col-form-label text-center login-label">FELHASZNÁLÓNÉV</label>
                      <input className="login-input" type="text" placeholder="Név" name="username" id="username" value={username} onChange={changeHandler}/>
                    </div>
                    <div className="justify-content-center  form-group row pb-1">
                      <label className="col-form-label text-center login-label">JELSZÓ</label>
                      <input className="login-input" type="password" placeholder="Jelszó" name="password" id="password" value={password} onChange={changeHandler}/>
                    </div>
                    <div>
                      <span className="login-error-msg">{errorMsgLogin}</span>
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