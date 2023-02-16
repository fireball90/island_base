import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

ReactDOM.render(
  React.createElement(Expedition),
  document.getElementById("root")
);
function Expedition() {
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center">
        <BackgroundComponent></BackgroundComponent>
      </div>
    </div>
  );
}

function BackgroundComponent() {
  return (
    <div className="content-bg">
      <div className="expedition-container">
        {/* <Link to="/management">
          <img
            className="expedition-close"
            alt="Bezárás"
            title="Bezárás"
            src="../images/ui/close.png"
          ></img>
        </Link> */}
        <div className="container-fluid">
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "700px" }}
          >
            <div className="col-12 align-items-center d-flex justify-content-center">
              <div className="expedition-cards flex-column">
                <div className="tutorial d-flex justify-content-center">
                  <p>Expedition</p>
                </div>
              </div>
              <div className="difficult-cards d-flex justify-content-center">
                <div className="container-card">
                  <div className="card-Easy">
                    <img
                      src="../images/difficulty/easy.png"
                      className="card-img-fluid"
                      alt="Easy"
                    ></img>
                    <div className="card-body">
                      <h5 className="card-title">EASY</h5>
                      <h6 className="card-name">easy</h6>
                      <p className="card-text">
                        Kevés alapanyag, xp és arany, de több esély a sikeres
                        expedícióra.
                      </p>
                    </div>
                  </div>
                  <div className="card-Medium">
                    <img
                      src="../images/difficulty/medium.png"
                      className="card-img-fluid"
                      alt="Medium"
                    ></img>
                    <div className="card-body">
                      <h5 className="card-title">MEDIUM</h5>
                      <h6 className="card-name">medium</h6>
                      <p className="card-text">
                        Közepes mennyiségű alapanyag, xp és arany, de kevesebb
                        esély a sikeres expedícióra.
                      </p>
                    </div>
                  </div>
                  <div className="card-Hard">
                    <img
                      src="../images/difficulty/hard.png"
                      className="card-img-fluid"
                      alt="Hard"
                    ></img>
                    <div className="card-body">
                      <h5 className="card-title">HARD</h5>
                      <h6 className="card-name">hard</h6>
                      <p className="card-text">
                        Sok alapanyag, xp és arany, de alacsony esély a sikeres
                        expedícióra.
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
  );
}

export default Expedition;
