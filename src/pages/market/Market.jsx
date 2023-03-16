import React, { useContext, useEffect } from "react";
import "../market/market.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button } from "react-bootstrap";
import { HudContext } from "../../App";

export default function Market() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout
      navigations={[
        <Button className="market-btn">Összes hirdetés</Button>,
        <Button className="market-btn">Saját hirdetés</Button>,
        <Button className="market-btn">
          <Link to="/sell">Hirdetés feladása</Link>
        </Button>,
      ]}
      title="Jelenlegi piaci hirdetések"
    >
      <div className="container-fluid">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "700px" }}
        >
          <div className="col-12 align-items-center d-flex justify-content-center">
            <div className="container">
              <div className="row">
                <div className="market-listings-container">
                  <div className="listing-container container">
                    <div
                      className="row d-flex align-items-center justify-content-center"
                      style={{ height: "100px" }}
                    >
                      <div className="col-3 text-center">
                        <p>
                          <img src="../images/icons/wood.png" alt="wood"></img>
                          Fa
                        </p>
                        <p>210 db</p>
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
                          Vas
                        </p>
                        <p>69 db</p>
                      </div>
                      <div className="col-3 text-center">
                        <button className="btn btn-warning">Csere</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}