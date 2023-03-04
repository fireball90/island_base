import React from "react";
import "../expedition/expedition.css";
import { Link } from "react-router-dom";

export function Expedition() {
  return (
    <div className="bacground-all">
      <div className="d-flex align-items-center justify-content-center">
        <div className="content-ebg">
          <div className="expedition-container">
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
                className="d-flex justify-content-center"
                style={{ height: "700px" }}
              >
                <div className="col-12 d-flex justify-content-center">
                  <div className="expedition-cards flex-column">
                    <div className="expedition d-flex justify-content-center">
                      <p>Expedició</p>
                    </div>
                    <div className="edifficult-cards align-items-center d-flex justify-content-center">
                      <div className="container-card d-flex justify-content-center">
                        <div className="card-Easy text-center">
                          <img
                            src="../images/difficulty/easy.png"
                            className="ecard-img-fluid"
                            alt="Easy"
                            title="Könnyű"
                          ></img>
                          <div className="ecard-body">
                            <Link to="/management">
                              <button className="expedition-btn">KÖNNYŰ</button>
                            </Link>
                            <p className="ecard-text">
                              Kevés alapanyag, xp és arany, de több esély a
                              sikeres expedícióra.
                            </p>
                          </div>
                        </div>
                        <div className="card-Medium text-center">
                          <img
                            src="../images/difficulty/medium.png"
                            className="ecard-img-fluid"
                            alt="Medium"
                            title="Normál"
                          ></img>
                          <div className="ecard-body">
                            <Link to="/management">
                              <button className="expedition-btn">NORMÁL</button>
                            </Link>
                            <p className="ecard-text">
                              Közepes mennyiségű alapanyag, xp és arany, de
                              kevesebb esély a sikeres expedícióra.
                            </p>
                          </div>
                        </div>
                        <div className="card-Hard text-center">
                          <img
                            src="../images/difficulty/hard.png"
                            className="ecard-img-fluid"
                            alt="Hard"
                            title="Nehéz"
                          ></img>
                          <div className="ecard-body">
                            <Link to="/management">
                              <button className="expedition-btn">NEHÉZ</button>
                            </Link>
                            <p className="ecard-text">
                              Sok alapanyag, xp és arany, de alacsony esély a
                              sikeres expedícióra.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
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
  );
}

export default Expedition;
