import React, { useContext, useEffect, useState } from "react";
import "../market/market.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button } from "react-bootstrap";
import HudContext from "../../contexts/HudContext";
import axios from "axios";

export default function Market() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const [exchange,setExchange] = useState([]);
  const [count,setCount] = useState(0);


  useEffect(() => {
    setIsHudDisplayed(true);
    axios
    .get("https://localhost:7276/api/Exchange/GetAllExchange")
    .then((response) => {
      const allExchange = response.data;

      setExchange(allExchange)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
    });
  }, []);

  function allChange(){
    axios
    .get("https://localhost:7276/api/Exchange/GetAllExchange")
    .then((response) => {
      const allExchange = response.data;

      setExchange(allExchange)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setCount(0);
    });
  }

  function ownChange(){
    axios
    .get("https://localhost:7276/api/Exchange/GetAllMyExchange")
    .then((response) => {
      const allExchange = response.data;

      setExchange(allExchange)
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setCount(1);
    });
  }

  function deleteExchange(id){
    console.log(id);
    axios
    .delete(`https://localhost:7276/api/Exchange/DeleteExchange?id=${id}`)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      //window.location.reload(false)
    });
  }

  function takeExchange(id){
    console.log(id);
    axios
    .delete(`https://localhost:7276/api/Exchange/BuyExchange?id=${id}`)
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      //window.location.reload(false)
    });
  }

  return (
    <Layout
      navigations={[
        <button className="market-btn" onClick={() => allChange()}>Összes hirdetés</button>,
        <button className="market-btn" onClick={() => ownChange()}>Saját hirdetés</button>,
        <Link to='/sell'><button className="market-btn">Hirdetés feladása</button></Link>,
      ]}
      title="Jelenlegi piaci hirdetések"
    >
      <div className="container-fluid">
        <div className="" style={{ height: "100%", width: "100%" }}>
          <div className="col-12 align-items-center d-flex justify-content-center">
            <div className="container">
              <div className="row">
                {exchange.map((exchange)=>(
                  <div className="listing-container container" key={exchange.id}>
                    <div
                      className="row d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      <div className="col-3 text-center">
                        <p>
                          <img src="../images/icons/wood.png" alt="wood"></img>
                          <span> {exchange.item}</span>
                        </p>
                        <p>{exchange.amount} db</p>
                      </div>
                      <div className="col-3 text-center">
                        <img
                          src="../images/tradeoffer.png"
                          alt="Trade-offer"
                        ></img>
                      </div>
                      <div className="col-3 text-center">
                        <p>
                          <img
                            src="../images/icons/steel.png"
                            alt="steel"
                          ></img>
                          <span> {exchange.replacementItem}</span>
                        </p>
                        <p>{exchange.replacementAmount} db</p>
                      </div>
                      <div className="col-3 text-center">
                        {count===0 ? (
                            <button className="market-update-btn" onClick={() => takeExchange(exchange.id)}>Csere</button>
                        ) : (
                            <button className="market-delete-btn" onClick={() => deleteExchange(exchange.id)}>Törlés</button>
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