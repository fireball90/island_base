import React from "react";
import "../tutorial/tutorial.css";
import { Link } from "react-router-dom";

function Tutorial() {
  return (
    <div className="bacground-all">
      <div className="d-flex align-items-center justify-content-center">
        <div className="content-tbg">
          <div className="d-flex justify-content-center flex-column">
            <div className="upIsland d-flex justify-content-center">
              {/*               <img
                className="europian-island"
                alt="Európai sziget"
                src="../assets/europian_island.png"
              ></img>

              <img
                className="viking-island"
                alt="Viking sziget"
                src="../assets/viking_island.png"
              ></img> */}
            </div>
            <div className="upIsland d-flex justify-content-center">
              {/*               <img
                className="japanese-island"
                alt="Japán sziget"
                src="../assets/japanese_island.png"
              ></img>
              <img
                className="indian-island"
                alt="Indiai sziget"
                src="../assets/indian-island.png"
              ></img> */}
            </div>
          </div>
        </div>
        <div className="content-tms">
          <div className="tutorial-container">
            <Link to="/management">
              <img
                className="x-close"
                alt="Bezárás"
                title="Bezárás"
                src="../images/ui/close.png"
              ></img>
            </Link>
            <div className="container-fluid">
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "700px" }}
              >
                <div className="col-12 align-items-center d-flex justify-content-center">
                  <div className="tutorials">
                    <div clasNames="justify-content-md-center">
                      <div className="col-12 text-center">
                        <div className="d-flex justify-content-center">
                          <div className="tutorial-inform flex-column">
                            <div className="tutorial d-flex justify-content-center">
                              <p>Útmutató</p>
                            </div>
                            <div className="information d-flex justify-content-center">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Quisque rutrum magna eleifend,
                                porta urna id, posuere tortor. Sed feugiat
                                auctor arcu eu condimentum. Etiam aliquet elit
                                lectus, eu pulvinar lectus ullamcorper a. Duis
                                laoreet tristique sem id tristique. In hac
                                habitasse platea dictumst. Duis tempor ante
                                facilisis sodales mollis. Nam vitae semper
                                magna, nec mollis ipsum. Nullam non metus dui.
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Nulla blandit mauris sapien, ac
                                malesuada tellus maximus eu. Suspendisse quis
                                feugiat est, vel vulputate erat. Phasellus
                                semper, nunc nec euismod euismod, arcu sapien
                                convallis turpis, in fringilla magna ipsum quis
                                lacus. Curabitur non commodo enim. Pellentesque
                                metus diam, volutpat sit amet enim non, auctor
                                laoreet enim. Nunc tincidunt bibendum congue.
                                Proin bibendum dui at massa imperdiet semper.
                                Curabitur odio odio, pharetra id arcu ac,
                                malesuada tincidunt lorem.
                              </p>
                            </div>
                          </div>
                          <div className="makers-cards d-flex justify-content-center">
                            <div className="container-card">
                              <div className="card-Balázs">
                                <img
                                  src="../images/makers/MészárosBalázs.jpg"
                                  className="card-img-fluid"
                                  alt="Balázs"
                                  title="Mészáros Balázs"
                                ></img>
                                <div className="card-body">
                                  <h5 className="tcard-title">Fejlesztő</h5>
                                  <h6 className="tcard-name">
                                    Mészáros Balázs
                                  </h6>
                                  <p className="tcard-text">
                                    meszarosb1@kkszki.hu
                                  </p>
                                </div>
                              </div>
                              <div className="card-Norbert">
                                <img
                                  src="../images/makers/LeknerNorbert.jpg"
                                  className="card-img-fluid"
                                  alt="Norbert"
                                  title="Lekner Norbert"
                                ></img>
                                <div className="card-body">
                                  <h5 className="tcard-title">Fejlesztő</h5>
                                  <h6 className="tcard-name">Lekner Norbert</h6>
                                  <p className="tcard-text">
                                    leknern@kkszki.hu
                                  </p>
                                </div>
                              </div>
                              <div className="card-Edit">
                                <img
                                  src="../images/makers/SzigiliEdit.jpg"
                                  className="card-img-fluid"
                                  alt="Edit"
                                  title="Szigili Edit"
                                ></img>
                                <div className="card-body">
                                  <h5 className="tcard-title">Fejlesztő</h5>
                                  <h6 className="tcard-name">Szigili Edit</h6>
                                  <p className="tcard-text">
                                    szigilie@kkszki.hu
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="back d-flex justify-content-center">
              <Link to="/management">
                <button className="market-btn">Vissza</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
