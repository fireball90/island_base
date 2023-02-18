import React from "react";
import "../expedition/expedition.css";
import { Link } from "react-router-dom";

export function Expedition() {
  return (
    <div className="expedition-all">
      <div className="d-flex align-items-center justify-content-center">
        <div className="content-bg">
          <div className="expedition-container">
            <Link to="/management">
              <img
                className="expedition-close"
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
                      <p>Expedition</p>
                    </div>
                    <div className="edifficult-cards align-items-center d-flex justify-content-center">
                      <div className="container-card d-flex justify-content-center">
                        <div className="card-Easy text-center">
                          <img
                            src="../images/difficulty/easy.png"
                            className="ecard-img-fluid"
                            alt="Easy"
                          ></img>
                          <div className="ecard-body">
                            <h2 className="ecard-title">EASY</h2>
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
                          ></img>
                          <div className="ecard-body">
                            <h2 className="ecard-title">MEDIUM</h2>
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
                          ></img>
                          <div className="ecard-body">
                            <h2 className="ecard-title">HARD</h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expedition;
