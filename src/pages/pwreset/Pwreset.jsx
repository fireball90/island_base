import React, { useContext, useEffect, useState } from "react";
import HudContext from "../../contexts/HudContext";

import "../pwreset/pwreset.css";

export default function Pwreset() {
  const { setIsHudDisplayed } = useContext(HudContext);
  
  const [email, setEmail] = useState("");
  
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetch("https://localhost:7276/api/Auth/SetTemporaryPassword", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Az emailt kiküldtük.");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setIsHudDisplayed(false);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="pwreset-container justify-content-center d-flex align-items-center">
        <div className="d-flex align-items-center flex-column">
          <div className="">
            <img
              className="pwreset-img"
              alt="ISLANDERS"
              src="../images/islanders_logo.png"
            ></img>
          </div>

          <div className="">
            <img
              className="pwreset-img2"
              alt="PWRESET"
              src="../images/elfelejtett_jelszo.png"
            ></img>
          </div>

          <form id="form" className="" onSubmit={submitHandler}>
            <div className="justify-content-center form-group row pb-3">
              <label className="col-form-label text-center pwreset-label">
                REGISZTRÁLÁSNÁL HASZNÁLT EMAIL CÍM
              </label>
              <div className="col-sm-8">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="pwreset-input"
                  onChange={handleChange}
                  value={email}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-button-reset">
                Küldés
              </button>
            </div>
          </form>

          <div className="">
            <p className="ml-auto pwreset-link">
              <a href="/login">Visszatérés a bejelentkezéshez</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}