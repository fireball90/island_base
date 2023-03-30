import React, { useContext, useEffect, useState } from "react";
import "../sell/sell.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import AlertModal from "../../components/alert-modal/Alert";

export default function Sell() {

  const { setIsHudDisplayed } = useContext(HudContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  const [myItem, setMyItem] = useState(0);
  const [myItemAmount, setMyItemAmount] = useState(0);

  const [theirItem, setTheirItem] = useState(0);
  const [theirItemAmount, setTheirItemAmount] = useState(0);

  function myItemChangeHandler(event) {
    setMyItem(event.target.value);
  }
  function myItemAmountChangeHandler(event) {
    setMyItemAmount(event.target.value);
  }

  function theirItemChangeHandler(event) {
    setTheirItem(event.target.value);
  }
  function theirItemAmountChangeHandler(event) {
    setTheirItemAmount(event.target.value);
  }


  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  function submit(event){
    event.preventDefault();
    if ((myItemAmount=0)||(theirItemAmount=0) || (myItemAmount>10000) || (theirItemAmount>10000)){
      setErrorMessage("0 és 10000 között kell lennie a mennyiségnek!")
    }
    console.log(myItem,myItemAmount,theirItem,theirItemAmount)
    axios
    .post("https://localhost:7276/api/Exchange/CreateExchange", {
      item: Number(myItem),
      amount: Number(myItemAmount),
      replacementItem: Number(theirItem),
      replacementAmount: Number(theirItemAmount),
    })
    .then(()=>{
      setModalShow(true);
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
      } else {
        setErrorMessage(error.response.data);
      }
    })
    .finally(() => {
      
    });
  }

  return (
    <Layout navigations={[]} title="Hirdetés feladása">

      {errorMessage ? (
                <div>
                  <AlertModal
                      title="Hiba történt"
                  > 
                    <span className="text-white">{errorMessage}</span>
                  </AlertModal>
                </div>
      ) : null}

      <SellModal
            show={modalShow}
            onHide={() => setModalShow(false)}
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center flex-column sell-all">
            <form id="sell-form" className="row" onSubmit={submit}>
              <div className="justify-content-center">
                <label className="col-sm-12 col-form-label text-center">
                  Válassz anyagot:
                </label>
                <select id="yourItems" name="myItem" className="form-select" value={myItem} onChange={myItemChangeHandler}>
                  <option value="0">Érme</option>
                  <option value="1">Fa</option>
                  <option value="2">Kő</option>
                  <option value="3">Vas</option>
                </select>
                <label className="col-sm-12 col-form-label text-center">
                  Válassz mennyiséget:
                </label>
                <input
                  type="number"
                  id="myAmount"
                  name="myAmount"
                  value={myItemAmount}
                  onChange={myItemAmountChangeHandler}
                  className="form-control"
                ></input>
              </div>
              <div className="justify-content-center">
                <label className="col-sm-12 col-form-label text-center">
                  Mit kérsz cserébe:
                </label>
                <select id="theirItem" name="theirItem" className="form-select" value={theirItem} onChange={theirItemChangeHandler}>
                  <option value="0">Érme</option>
                  <option value="1">Fa</option>
                  <option value="2">Kő</option>
                  <option value="3">Vas</option>
                </select>
                <label className="col-sm-12 col-form-label text-center">
                  Mennyit kérsz cserébe:
                </label>
                <input
                  type="number"
                  name="theirAmount"
                  id="theirAmount"
                  value={theirItemAmount}
                  onChange={theirItemAmountChangeHandler}
                  className="form-control"
                ></input>
                <div className="d-flex justify-content-center pt-3">
                  <button className="sell-btn font-btn" type="submit">
                    Hirdetés feladása
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="why-tho d-flex justify-content-center align-items-center">
            <Link className="pb-3" to="/market">
              <button className="market-btn font-btn">Mégse</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function SellModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-animation"
    >
      <div className="successful-sell-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sikeres hirdetés feladás
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
           A hirdetését sikeresen feladta a piacon. A saját hirdetések gombra kattintva törölheti, ha meggondolja magát!
           Kattinston a bezárás gombra a továbblépéshez!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Link to="/market">
            <button onClick={props.onHide} className="modal-sell-btn">
              Bezárás
            </button>
          </Link>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
