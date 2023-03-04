import React from "react";
import "../myprofile/myprofile.css";
import { Link } from "react-router-dom";

function Myprofile() {
  return (
    <div className="myprofile-all">
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
            <div className="container-fluid">
              <div
                className="d-flex justify-content-center "
                style={{ height: "700px" }}
              >
                <div className="col-12 d-flex justify-content-center">
                  <div className="myprofile-data flex-column">
                    <div className="myprofile d-flex justify-content-center">
                      <img
                        className="myprofile-indian"
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
                        </div>

                        <p>Email cím: </p>
                        <p>Jelszó módósítása:</p>
                        <p>Új jelszó:</p>
                        <p>Új jelszó ismétlése:</p>
                        <div className="modifies d-flex justify-content-center">
                          <Link to="/management">
                            <button className="myprofile-btn">Módosít</button>
                          </Link>
                        </div>
                      </form>
                    </div>
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
    </div>
  );
}

export default Myprofile;
