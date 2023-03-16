import React, { useContext, useEffect } from "react";
import "../myprofile/myprofile.css";
import { Link } from "react-router-dom";
import { HudContext } from "../../App";

export default function Myprofile() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);
  
  return (
    <div className="bacground-all">
      <div className="d-flex align-items-center justify-content-center">
        <div className="content-mybg">
          <div className="myprofile-container">
            <Link to="/management">
              <img
                className="x-close"
                alt="Bezárás"
                title="Bezárás"
                src="../images/ui/close.png"
              ></img>
            </Link>

            <div className="d-flex justify-content-center">
              <div className="myprofile-data flex-column">
                <div className="myprofile d-flex justify-content-center">
                  <img
                    className="myprofile-island"
                    alt="Indian"
                    title="Indian"
                    src="../images/ui/indian_ribbon.png"
                  ></img>
                </div>
                <div className="Profile d-flex justify-content-center">
                  <form id="myprofile-form" className="row">
                    <div className="User justify-content-center">
                      <label className="col-sm-12 col-form-label text-center">
                        Felhasználónév:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                      ></input>
                      <label className="col-sm-12 col-form-label text-center">
                        Email cím:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email"
                        aria-label="Email"
                      ></input>
                      <p>Jelszó módósítása:</p>
                      <label className="col-sm-12 col-form-label text-center">
                        Új jelszó:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="new-password"
                        aria-label="new-password"
                      ></input>
                      <label className="col-sm-12 col-form-label text-center">
                        Új jelszó ismétlése:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="repeat-new-password"
                        aria-label="repeat-new-password"
                      ></input>
                    </div>
                    <div className="modifies d-flex justify-content-center">
                      <Link to="/management">
                        <button className="modifies-btn">Módosít</button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="back d-flex justify-content-center">
              <Link to="/management">
                <button className="market-btn">Vissza</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}