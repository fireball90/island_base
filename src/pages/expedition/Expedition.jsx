import React, { useContext, useEffect } from "react";
import "../expedition/expedition.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";

export default function Expedition() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout navigations={[]} title="Expedíció">
      <div className="container-fluid">
        <div className="expedition justify-content-center">
          <h2>Válasszon az expedíciók erősségei közül</h2>
          <div className="edificult d-flex justify-content-evenly">
            <div>
              <img
                src="../images/difficulty/easy.png"
                className="ecard-img-fluid"
                alt="Easy"
                title="Könnyű"
              ></img>
              <div className="ecard-body">
                <Link to="/island">
                  <button className="expedition-btn" title="KÖNNYŰ">
                    KÖNNYŰ
                  </button>
                </Link>
                <p className="ecard-text">
                  Kevés alapanyag, xp és arany, de több esély a sikeres
                  expedícióra.
                </p>
              </div>
            </div>
            <div>
              <img
                src="../images/difficulty/medium.png"
                className="ecard-img-fluid"
                alt="Medium"
                title="Normál"
              ></img>
              <div className="ecard-body">
                <Link to="/island">
                  <button className="expedition-btn" title="NORMÁL">
                    NORMÁL
                  </button>
                </Link>
                <p className="ecard-text">
                  Közepes mennyiségű alapanyag, xp és arany, de kevesebb esély a
                  sikeres expedícióra.
                </p>
              </div>
            </div>
            <div>
              <img
                src="../images/difficulty/hard.png"
                className="ecard-img-fluid"
                alt="Hard"
                title="Nehéz"
              ></img>
              <div className="ecard-body">
                <Link to="/island">
                  <button className="expedition-btn" title="NEHÉZ">
                    NEHÉZ
                  </button>
                </Link>
                <p className="ecard-text">
                  Sok alapanyag, xp és arany, de alacsony esély a sikeres
                  expedícióra.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
