import React from "react";
import "../expedition/expedition.css";
import { Link } from "react-router-dom";
import { useState } from 'react';
import DefaultPage from "../../components/default-page/DefaultPage";
import LoadingScreen from "../../components/loading-screen/LoadingScreen";
import { Button } from 'react-bootstrap';

export function Expedition() {
    const [isLoading, setIsLoading] = useState(false)
    return isLoading ? (
      <LoadingScreen loadingMessage={'Itt hamarosan elérhető lesz a sziget választás...'} />
    ) :
      (
        <DefaultPage
          navigations={[
  
          ]}
          title="Expedíció"
        >
            <div className="container-fluid">
                <div className="d-flex justify-content-center align-items-center ">
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
    </DefaultPage>
  );
}

export default Expedition;
