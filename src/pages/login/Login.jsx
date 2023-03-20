import axios from "axios";
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import HudContext from "../../contexts/HudContext";
import PlayerContext from "../../contexts/PlayerContext";
import UserContext from "../../contexts/UserContext";

import "../login/login.css";

export default function Login() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  const { setIsHudDisplayed } = useContext(HudContext);
  const { setUserLogined } = useContext(UserContext);
  const { setPlayer } = useContext(PlayerContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoginPending, setIsloginPending] = useState(false);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);

  function decodeToken(token) {
    const tokenBody = token.split(".")[1];
    const decodedTokenBody = JSON.parse(window.atob(tokenBody));

    return { ...decodedTokenBody, exp: new Date(decodedTokenBody.exp * 1000) };
  }

  function usernameChangeHandler(event) {
    setUsername(event.target.value);
  }

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function submit(event) {
    event.preventDefault();
    setIsloginPending(true);

    axios
      .post("https://localhost:7276/api/Auth/Login", {
        username: username,
        password: password,
      })
      .then((response) => {
        const token = response.data;

        cookie.set("token", token);
        axios.defaults.headers.common["Authorization"] = `bearer ${token}`;

        const decodedToken = decodeToken(token);
        setUserLogined(decodedToken.Username, decodedToken.Email);

        requestPlayer();
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
        } else {
          setErrorMessage("Hibás felhasználónév vagy jelszó!");
        }
      })
      .finally(() => {
        setIsloginPending(false);
      });
  }

  function requestPlayer() {
    setIsPlayerLoading(true);

    axios
      .get("https://localhost:7276/api/Player/GetPlayer")
      .then((response) => {
        setPlayer(response.data);
        navigate("/island");
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
        } else {
          navigate("/select-island");
        }
      })
      .finally(() => {
        setIsPlayerLoading(false);
      });
  }

  useEffect(() => {
    setIsHudDisplayed(false);

    const token = cookie.get("token");

    if (token === undefined) return;

    const decodedToken = decodeToken(token);
    const now = new Date();

    if (decodedToken.exp < now) return;

    axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
    setUserLogined(decodedToken.Username, decodedToken.Email);

    requestPlayer();
  }, []);

  return isPlayerLoading ? null : (
    <div className="d-flex justify-content-center align-items-center">
      <div className="login-container justify-content-center d-flex align-items-center">
        <div className="d-flex align-items-center flex-column">
          <div className="">
            <img
              className="login-img"
              alt="ISLANDERS"
              src="../images/islanders_logo.png"
            ></img>
          </div>

          <div className="">
            <img
              className="login-img2"
              alt="BEJELENTKEZÉS"
              src="../images/bejelentkezes.png"
            ></img>
          </div>

          <form id="form" className="" onSubmit={submit}>
            <div className="justify-content-center  form-group row pb-1">
              <label className="col-form-label text-center login-label">
                FELHASZNÁLÓNÉV
              </label>
              <input
                className="login-input"
                type="text"
                placeholder="Név"
                value={username}
                onChange={usernameChangeHandler}
              />
            </div>
            <div className="justify-content-center  form-group row pb-1">
              <label className="col-form-label text-center login-label">
                JELSZÓ
              </label>
              <input
                className="login-input"
                type="password"
                placeholder="Jelszó"
                value={password}
                onChange={passwordChangeHandler}
              />
            </div>
            {errorMessage ? (
              <div>
                <span className="login-error-msg">{errorMessage}</span>
              </div>
            ) : null}
            <div className="d-flex justify-content-center">
              <Button type="submit" disabled={isLoginPending}>
                Belépés
              </Button>
            </div>
          </form>

          <div className="d-flex justify-content-center">
            <p className="ml-auto login-link">
              <a href="/register">Még nem regisztrált? Kattintson ide!</a>
            </p>
          </div>

          <div className="d-flex justify-content-center">
            <p className="ml-auto login-link">
              <a href="/pwreset">Elfelejtette a jelszavát?</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}