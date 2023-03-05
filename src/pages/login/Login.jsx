import axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";

import '../login/login.css';

export default function Login() {
  const cookie = new Cookies()
  const userToken = cookie.get('token')

  const navigate = useNavigate()

  const { setIsLogined, setUser } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  function decodeToken(token) {
    if (token == undefined) return undefined

    const tokenBody = token.split('.')[1]
    const decodedTokenBody = JSON.parse(window.atob(tokenBody))

    return { ...decodedTokenBody, exp: new Date(decodedTokenBody.exp * 1000) }
  }

  function usernameChangeHandler(event) {
    setUsername(event.target.value)
  }

  function passwordChangeHandler(event) {
    setPassword(event.target.value)
  }

  function submit(event) {
    event.preventDefault();

    axios.post('https://localhost:7276/api/Auth/Login', {
      username: username,
      password: password
    })
      .then(response => response.data)
      .then(token => {
        cookie.set('token', token, { path: '/' })
        userToken = token
      })
      .catch(error => {
        setErrorMessage('Hibás felhasználónév, vagy jelszó!')
      })
  }

  useEffect(() => {
    if (userToken != undefined) {
      const decodedToken = decodeToken(userToken)
      const now = new Date()

      if (decodedToken.exp >= now) {
        setUser(decodedToken.Username, decodedToken.Email)
        setIsLogined(true)

        navigate('select-island')
      }
    }
  }, [userToken])

  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div className='login-container justify-content-center d-flex align-items-center'>
        <div className='d-flex align-items-center flex-column'>

          <div className=''>
            <img className='login-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
          </div>

          <div className=''>
            <img className='login-img2' alt='BEJELENTKEZÉS' src='../images/bejelentkezes.png'></img>
          </div>

          <form id="form" className="" onSubmit={submit}>
            <div className="justify-content-center  form-group row pb-1">
              <label className="col-form-label text-center login-label">FELHASZNÁLÓNÉV</label>
              <input className="login-input" type="text" placeholder="Név" value={username} onChange={usernameChangeHandler} />
            </div>
            <div className="justify-content-center  form-group row pb-1">
              <label className="col-form-label text-center login-label">JELSZÓ</label>
              <input className="login-input" type="password" placeholder="Jelszó" value={password} onChange={passwordChangeHandler} />
            </div>
            {
              errorMessage ? (
                <div>
                  <span className="login-error-msg">{ errorMessage }</span>
                </div>
              ) : (
                null
              )
            }
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
  )
}