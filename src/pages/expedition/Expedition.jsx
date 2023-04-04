import React, { Component, useContext, useEffect, useState } from "react";
import "../expedition/expedition.css";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import AlertModal from "../../components/alert-modal/Alert";
import IslandContext from "../../contexts/IslandContext";
import { Subject, switchMap, timer, scan, takeWhile } from "rxjs";

const block$ = new Subject()
  .pipe(
    switchMap(date => {
      const countdownTick = 1000;

      const now = new Date();
      const nextExpeditionTime = date.getTime() - now.getTime() + 1000;
      const beginTime = nextExpeditionTime % countdownTick;

      return timer(beginTime, countdownTick)
        .pipe(
          scan((previousTime) => {
            return previousTime - countdownTick;
          }, nextExpeditionTime - beginTime),
          takeWhile(countdown => countdown >= 0)
        )
    })
  );

export default function Expedition() {
  const { player, setPlayer } = useContext(IslandContext);
  const { setIsHudDisplayed } = useContext(HudContext);
  const [modalShow, setModalShow] = useState(false);
  const [expData, setExpData] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [blockTime, setBlockTime] = useState(0);

  function handleChooseExpedition(difficulty) {
    axios
      .get(
        `https://localhost:7276/api/Expedition/Expedition?difficulty=${difficulty}`
      )
      .then((response) => {
        setExpData(response.data);
        setModalShow(true);
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
        } else {
          setErrorMessage(error.response.data);
        }
      });
  }
  useEffect(() => {
    const now = new Date();
    const lastExpeditionDate = new Date(player.lastExpeditionDate)
    lastExpeditionDate = lastExpeditionDate.addMinutes(lastExpeditionDate.getMinutes() + 1);

    if (lastExpeditionDate.getTime() > now.getTime()) {
      block$.next(lastExpeditionDate);
    }


    block$.subscribe(time => {
      console.log(time);
    })
    setIsHudDisplayed(true);
  }, []);

  function ExpeditionResultModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter modal-animation"
        centered
      >

        <div className="modal-exp-container">
          <Modal.Body>
            <div className="" key={expData.id}>
              <div className="text-center">
                <h4>{expData.title}</h4>
              </div>
              <div className="exp-message-container text-white">
                <p>{expData.message}</p>
                <p className="text-center">
                  <span>
                    <img
                      src="../images/icons/coin.png"
                      alt="Érme"
                      title="Érme"
                    ></img>{" "}
                    {expData.coins} -{" "}
                  </span>
                  <span>
                    <img
                      src="../images/icons/wood.png"
                      alt="Fa"
                      title="Fa"
                    ></img>{" "}
                    {expData.woods} -{" "}
                  </span>
                  <span>
                    <img
                      src="../images/icons/stone.png"
                      alt="Kő"
                      title="Kő"
                    ></img>{" "}
                    {expData.stones} -{" "}
                  </span>
                  <span>
                    <img
                      src="../images/icons/steel.png"
                      alt="Vas"
                      title="Vas"
                    ></img>{" "}
                    {expData.irons} -{" "}
                  </span>
                  <span>
                    <img src="../images/icons/xp.png" alt="XP" title="XP"></img>{" "}
                    {expData.experience}{" "}
                  </span>
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <button
                  onClick={props.onHide}
                  className="modal-exp-btn font-btn"
                >
                  Bezárás
                </button>
              </div>
            </div>
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
      {errorMessage ? (
        <div>
          <AlertModal
            title="Hiba történt"
          >
            <span className="text-white">{errorMessage}</span>
          </AlertModal>
        </div>
      ) : null}
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
                  className="expedition-btn font-btn"
                  title="KÖNNYŰ"
                  onClick={() => handleChooseExpedition(1)}
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
                <button
                  className="expedition-btn font-btn"
                  title="NORMÁL"
                  onClick={() => handleChooseExpedition(2)}
                >
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
                <button
                  className="expedition-btn font-btn"
                  title="NEHÉZ"
                  onClick={() => handleChooseExpedition(3)}
                >
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
      <button onClick={() => block$.next(new Date('2023-04-04T18:03:00'))}>Asd</button>
    </Layout>
  );
}