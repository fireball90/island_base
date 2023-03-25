import React, { useContext, useEffect, useState } from "react";
import "../expedition/expedition.css";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';

export default function Expedition() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const [modalShow, setModalShow] = React.useState(false);
  const [expData, setExpData] = useState([]);

  function selectExpeditionHandler(difficulty) {

  axios
    .get(
      `https://localhost:7276/api/Expedition/Expedition?difficulty=${difficulty}`
    )
    .then((response) => {
      setExpData(response.data);
    })
    .then(() =>{
      setModalShow(true);
    })
    .catch(() => {
      alert("Nem sikerült kapcsolódni a szerverhez");
    });
}
  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  function ExpeditionResultModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-exp-container">
        <Modal.Body>
          {expData.map((expData)=>(
            <div className="successful-register-modal" key={expData.id}>
              <div closeButton>
                <div id="contained-modal-title-vcenter">
                  {expData.title}
                </div>
              </div>
              <div className="exp-message-container text-white">
                <p>
                  {expData.message}
                </p>
              </div>
              <div className="exp-message-container text-center text-white">
                <p>
                  <span><img src="../images/icons/coin.png" alt="Érme" title="Érme"></img>{expData.coins}</span>
                  <span><img src="../images/icons/wood.png" alt="Fa" title="Fa"></img>{expData.woods}</span>
                  <span><img src="../images/icons/stone.png" alt="Kő" title="Kő"></img>{expData.stones}</span>
                  <span><img src="../images/icons/steel.png" alt="Vas" title="Vas"></img>{expData.irons}</span>
                  <span><img src="../images/icons/coin.png" alt="XP" title="XP"></img>{expData.experience}</span>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <button onClick={props.onHide} className="modal-exp-btn">Bezárás</button>
              </div>
            </div>
          ))}
        </Modal.Body>
        </div>
      </Modal>
    );
  }

  return (
    <Layout navigations={[]} title="Expedíció">
          <ExpeditionResultModal
          show={modalShow}
          onHide={() => setModalShow(false)}
      />
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
