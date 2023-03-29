import React, { useContext, useEffect, useState } from "react";
import "../myprofile/myprofile.css";
import UserContext from "../../contexts/UserContext";
import HudContext from "../../contexts/HudContext";
import Layout from "../../components/layout/Layout";
import ProfileImage from "../../components/profile-image/ProfileImage";
import axios from "axios";
import { useNavigate } from "react-router";

export default function Myprofile() {
  const navigate = useNavigate();

  const { setIsHudDisplayed } = useContext(HudContext);
  const { user, setUserLoggedOut, isEmailVerified } = useContext(UserContext);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  function passwordChangeHandler(event) {
    setPassword(event.target.value);
  }

  function confirmPasswordChangeHandler(event) {
    setConfirmPassword(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Nem egyeznek a megadott jelszavak!");
      return;
    }

    axios
      .put("https://localhost:7276/api/Auth/ResetPassword", {
        password: password,
        confirmPassword: confirmPassword,
      })
      .then(() => {
        setUserLoggedOut();
        navigate("");
      })
      .catch(() => {
        setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
      });
  }

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout navigations={[]} title="Saját profil">
      <div className="myprofile-data flex-column">
        <div className="myprofile d-flex justify-content-center">
          <ProfileImage />
        </div>
        <div className="Profile d-flex justify-content-center">
          <form id="myprofile-form" className="row" onSubmit={submitHandler}>
            <div className="User justify-content-center">
              <h2>{user.username}</h2>
              <h2>{user.email}</h2>
              {
                  isEmailVerified ? 'Email megerősítve' : 'Nincs megerősítve az email'
              }
              <div className="reset-passwordjustify-content-center bg-bleur">
                <h3 className="text-profile text-center">Jelszó módosítása:</h3>
                <label className="text-label col-sm-12 text-center">
                  Új jelszó:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Jelszó"
                  aria-label="new-password"
                  value={password}
                  onChange={passwordChangeHandler}
                ></input>
                <label className="text-label col-sm-12 text-center">
                  Új jelszó ismétlése:
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Jelszó ismétlése"
                  aria-label="repeat-new-password"
                  value={confirmPassword}
                  onChange={confirmPasswordChangeHandler}
                ></input>
              </div>
              <div className="modifies d-flex justify-content-center">
                <button className="modifies-btn" type="submit">
                  Módosít
                </button>
                <div className="fs-6 text-danger">{errorMessage}</div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}