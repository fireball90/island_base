import React, { useContext, useEffect } from "react";
import "../tutorial/tutorial.css";
import { HudContext } from "../../App";
import Layout from "../../components/layout/Layout";

export default function Tutorial() {
  const { setIsHudDisplayed } = useContext(HudContext);

  useEffect(() => {
    setIsHudDisplayed(true);
  }, []);

  return (
    <Layout navigations={[]} title="Útmutató">
      <div className="container-fluid">
        <div className="align-items-center d-flex justify-content-center">
          <div className="text-center">
            <div className="information">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                rutrum magna eleifend, porta urna id, posuere tortor. Sed
                feugiat auctor arcu eu condimentum. Etiam aliquet elit lectus,
                eu pulvinar lectus ullamcorper a. Duis laoreet tristique sem id
                tristique. In hac habitasse platea dictumst. Duis tempor ante
                facilisis sodales mollis. Nam vitae semper magna, nec mollis
                ipsum. Nullam non metus dui. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nulla blandit mauris sapien, ac
                malesuada tellus maximus eu. Suspendisse quis feugiat est, vel
                vulputate erat. Phasellus semper, nunc nec euismod euismod, arcu
                sapien convallis turpis, in fringilla magna ipsum quis lacus.
                Curabitur non commodo enim. Pellentesque metus diam, volutpat
                sit amet enim non, auctor laoreet enim. Nunc tincidunt bibendum
                congue. Proin bibendum dui at massa imperdiet semper. Curabitur
                odio odio, pharetra id arcu ac, malesuada tincidunt lorem.
              </p>
              <div className="d-flex justify-content-center">
                <div>
                  <img
                    src="../images/makers/MészárosBalázs.jpg"
                    className="card-img-fluid"
                    alt="Balázs"
                    title="Mészáros Balázs"
                  ></img>
                  <div className="card-body">
                    <h5 className="tcard-title">Fejlesztő</h5>
                    <h6 className="tcard-name">Mészáros Balázs</h6>
                    <p className="tcard-text">meszarosb1@kkszki.hu</p>
                  </div>
                </div>
                <div>
                  <img
                    src="../images/makers/LeknerNorbert.jpg"
                    className="card-img-fluid"
                    alt="Norbert"
                    title="Lekner Norbert"
                  ></img>
                  <div className="card-body">
                    <h5 className="tcard-title">Fejlesztő</h5>
                    <h6 className="tcard-name">Lekner Norbert</h6>
                    <p className="tcard-text">leknern@kkszki.hu</p>
                  </div>
                </div>
                <div>
                  <img
                    src="../images/makers/SzigiliEdit.jpg"
                    className="card-img-fluid"
                    alt="Edit"
                    title="Szigili Edit"
                  ></img>
                  <div className="card-body">
                    <h5 className="tcard-title">Fejlesztő</h5>
                    <h6 className="tcard-name">Szigili Edit</h6>
                    <p className="tcard-text">szigilie@kkszki.hu</p>
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