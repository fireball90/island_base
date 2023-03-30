import React, { useContext, useEffect, useState } from "react";
import "../market/market.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import AlertModal from "../../components/alert-modal/Alert";

export default function Market() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const [exchange,setExchange] = useState([]);
  const [count,setCount] = useState(0);
  const [modalShow, setModalShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const iconPaths  = [
    "../images/icons/coin.png",
    "../images/icons/wood.png",
    "../images/icons/stone.png",
    "../images/icons/steel.png"
  ]
  const iconNames = [
    "Érme",
    "Fa",
    "Kő",
    "Vas"
  ]

  function handleExchange(item){
    axios
    .get("https://localhost:7276/api/Exchange/GetAllExchanges")
    .then((response) => {
      const allExchange = response.data;
      setExchange(allExchange)
      setExchange(previousExchange => previousExchange.filter((exchange)=> exchange.item === Number(item) ));
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
      } else {
        setErrorMessage(error.response.data);
      }
    })
 }

  useEffect(() => {
    setIsHudDisplayed(true);
    axios
    .get("https://localhost:7276/api/Exchange/GetAllExchanges")
    .then((response) => {
      const allExchange = response.data;
      setExchange(allExchange)
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
  }, []);


  function allChange(){
    axios
    .get("https://localhost:7276/api/Exchange/GetAllExchanges")
    .then((response) => {
      const allExchange = response.data;
      setExchange(allExchange)
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
      } else {
        setErrorMessage(error.response.data);
      }
    })
    .finally(() => {
      setCount(0);
    });
  }

  function ownChange(){
    axios
    .get("https://localhost:7276/api/Exchange/GetAllMyExchanges")
    .then((response) => {
      const allExchange = response.data;
      setExchange(allExchange)
    })
    .catch((error) => {
      if (error.code === "ERR_NETWORK") {
        setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
      } else {
        setErrorMessage(error.response.data);
      }
    })
    .finally(() => {
      setCount(1);
    });
  }

  function removeExchange(exId) {
    return (
      setExchange(previousExchanges => previousExchanges.filter((Exchange)=> Exchange.id !== exId ))
    );
  }

  function deleteExchange(id){
    axios
    .delete(`https://localhost:7276/api/Exchange/DeleteExchange?id=${id}`)
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

  function takeExchange(id){
    axios
    .put(`https://localhost:7276/api/Exchange/BuyExchange?id=${id}`)
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
    .then(() => {

    })
    .finally(() => {
    });
  }

  return (
    <Layout
      navigations={[
        <button className="market-btn font-btn" onClick={() => allChange()}>Összes hirdetés</button>,
        <button className="market-btn font-btn" onClick={() => ownChange()}>Saját hirdetés</button>,
        <Link to='/sell'><button className="market-btn font-btn">Hirdetés feladása</button></Link>,
      ]}
      title="Jelenlegi piaci hirdetések"
    >
     {errorMessage ? (
                <div>
                  <AlertModal
                      title="Hiba történt"
                  > 
                    <span className="text-white">{errorMessage}</span>
                  </AlertModal>
                </div>
      ) : null}
    <MarketModal
        show={modalShow}
        onHide={() => setModalShow(false)}
    />
      <div className="container-fluid">
        {count === 0 ? (
          <div className="d-flex justify-content-center align-items-center">
            <div className="col-9 text-center">
              <button className="market-search-btn font-btn" onClick={()=>handleExchange(0)}>Érme</button>
              <button className="market-search-btn font-btn" onClick={()=>handleExchange(1)}>Fa</button>
              <button className="market-search-btn font-btn" onClick={()=>handleExchange(2)}>Kő</button>
              <button className="market-search-btn font-btn" onClick={()=>handleExchange(3)}>Vas</button>
            </div>
          </div>
        ) : null}
        <div className="" style={{ height: "100%", width: "100%" }}>
          <div className="col-12 align-items-center d-flex justify-content-center">
            <div className="container">
              <div className="row">
                {exchange.map((exchange)=>(
                  <div className="listing-container container" key={exchange.id}>
                    <div className="row d-flex align-items-center justify-content-center market-height">
                      <div className="col-3 text-center">
                        <p>
                          <img src={iconPaths[exchange.item]} alt={exchange.item}></img>
                          <span> {iconNames[exchange.item]}</span>
                          <p>{exchange.amount} db</p>
                        </p>
                      </div>
                      <div className="col-3 text-center">
                        <img
                          className="trade-img"
                          src="../images/tradeoffer.png"
                          alt="Trade-offer"
                        ></img>
                      </div>
                      <div className="col-3 text-center">
                        <p>
                          <img
                            src={iconPaths[exchange.replacementItem]}
                            alt="steel"
                          ></img>
                          <span> {iconNames[exchange.replacementItem]}</span>
                          <p>{exchange.replacementAmount} db</p>
                        </p> 
                      </div>
                      <div className="col-3 text-center">
                        {count===0 ? (
                            <button className="market-update-btn font-btn" onClick={() => {takeExchange(exchange.id);removeExchange(exchange.id)}}>Csere</button>
                        ) : (
                            <button className="market-delete-btn font-btn" onClick={() => {deleteExchange(exchange.id);removeExchange(exchange.id)}}>Törlés</button>
                        )}
                      </div>
                    </div>
                  </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
function MarketModal(props, marketMessage) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="modal-animation"
    >
      <div className="successful-register-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sikeres művelet!
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Link to="/market">
            <button onClick={props.onHide} className="modal-register-btn">
              Bezárás
            </button>
          </Link>
        </Modal.Footer>
      </div>
    </Modal>
  );
}