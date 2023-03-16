import React, { useContext, useEffect } from "react";
import "../sell/sell.css";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import HudContext from "../../contexts/HudContext";

export default function Sell() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout navigations={[]} title="Hirdetés feladása">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 d-flex align-items-center justify-content-center flex-column sell-all">
            <h3>Hirdetés feladása</h3>
            <form id="sell-form" className="row">
              <div className="justify-content-center">
                <label className="col-sm-12 col-form-label text-center">
                  Válassz anyagot:
                </label>
                <select id="yourItems" name="yourItems" className="form-select">
                  <option value="wood">Fa</option>
                  <option value="stone">Kő</option>
                  <option value="steel">Vas</option>
                  <option value="coin">Érmék</option>
                </select>
                <label className="col-sm-12 col-form-label text-center">
                  Válassz mennyiséget:
                </label>
                <input
                  type="number"
                  name="yourPiece"
                  className="form-control"
                ></input>
              </div>
              <div className="justify-content-center">
                <label className="col-sm-12 col-form-label text-center">
                  Mit kérsz cserébe:
                </label>
                <select
                  id="theirItems"
                  name="theirItems"
                  className="form-select"
                >
                  <option value="wood">Fa</option>
                  <option value="stone">Kő</option>
                  <option value="steel">Vas</option>
                  <option value="coin">Érmék</option>
                </select>
                <label className="col-sm-12 col-form-label text-center">
                  Mennyit kérsz cserébe:
                </label>
                <input
                  type="number"
                  name="theirPiece"
                  className="form-control"
                ></input>
                <div className="d-flex justify-content-center pt-3">
                  <button className="sell-btn" onClick="">
                    Hirdetés feladása
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="why-tho d-flex justify-content-center align-items-center">
            <Link to="/market">
              <button className="market-btn">Mégse</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}