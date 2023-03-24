import React, { useContext, useEffect } from "react";
import "../expedition/expedition.css";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Expedition() {
  const { setIsHudDisplayed } = useContext(HudContext);
  
  function selectExpeditionHandler(difficulty) {

  axios
    .get(
      `https://localhost:7276/api/Expedition/Expedition?difficulty=${difficulty}`
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch(() => {
      alert("Nem sikerült kapcsolódni a szerverhez");
    });
}
  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout navigations={[]} title="Expedíció">
      <div className="container-fluid">
        <div className="expedition justify-content-center">
          <h2>Válasszon az expedíciók erősségei közül</h2>
          <div className="edificult d-flex justify-content-evenly">
            <div className="exp-cont-bg">
              <img
                src="../images/difficulty/easy.png"
                className="ecard-img-fluid"
                alt="Easy"
                title="Könnyű"
              ></img>
              <div className="ecard-body">
                <button
                  className="expedition-btn"
                  title="KÖNNYŰ"
                  onClick={() => selectExpeditionHandler(1)}
                >
                  KÖNNYŰ
                </button>
                <p className="ecard-text">
                  Kevés alapanyag, xp és arany, de több esély a sikeres
                  expedícióra.
                </p>
              </div>
            </div>
            <div className="exp-cont-bg">
              <img
                src="../images/difficulty/medium.png"
                className="ecard-img-fluid"
                alt="Medium"
                title="Normál"
              ></img>
              <div className="ecard-body">
                  <button className="expedition-btn" title="NORMÁL"onClick={() => selectExpeditionHandler(2)}>
                    NORMÁL
                  </button>
                <p className="ecard-text">
                  Közepes mennyiségű alapanyag, xp és arany, de kevesebb esély a
                  sikeres expedícióra.
                </p>
              </div>
            </div>
            <div className="exp-cont-bg">
              <img
                src="../images/difficulty/hard.png"
                className="ecard-img-fluid"
                alt="Hard"
                title="Nehéz"
              ></img>
              <div className="ecard-body">
                  <button className="expedition-btn" title="NEHÉZ"onClick={() => selectExpeditionHandler(3)}>
                    NEHÉZ
                  </button>
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
