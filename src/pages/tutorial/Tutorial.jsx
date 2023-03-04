import React from "react";
import "../tutorial/tutorial.css";
import { Link } from "react-router-dom";

function Tutorial() {
  return (
    <div className="tutorial-all">
      <div className="d-flex align-items-center justify-content-center">
        <div className="content-bg">
          <div className="d-flex justify-content-center flex-column">
            <div className="upIsland d-flex justify-content-center">
{/*               <img
                className="europian-island"
                alt="Európai sziget"
                class="img-fluid"
                src="../assets/europian_island.png"
              ></img>

              <img
                className="viking-island"
                alt="Viking sziget"
                class="img-fluid"
                src="../assets/viking_island.png"
              ></img> */}
            </div>
            <div className="upIsland d-flex justify-content-center">
{/*               <img
                className="japanese-island"
                alt="Japán sziget"
                class="img-fluid"
                src="../assets/japanese_island.png"
              ></img>
              <img
                className="indian-island"
                alt="Indiai sziget"
                class="img-fluid"
                src="../assets/indian-island.png"
              ></img> */}
            </div>
          </div>
        </div>
        <div className="content-ms">
          <div className="tutorial-container">
            <Link to="/management">
              <img
                className="tutorial-close"
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
                          <div className="tutorial-videos flex-column">
                            <div className="tutorial d-flex justify-content-center">
                              <p>Tutorial</p>
                            </div>
                            <div className="videos d-flex justify-content-center">
                              <p>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Quisque lacus eros, interdum
                                vel quam in, vulputate cursus lacus. Nullam
                                fermentum elit magna, ut mollis ante porttitor
                                eget. Integer aliquet efficitur fermentum. Morbi
                                fermentum euismod ex. Cras id malesuada urna.
                                Nunc fringilla dignissim metus, efficitur
                                bibendum metus varius eget. Curabitur rutrum
                                eros ac dui tincidunt, in egestas ex iaculis.
                                Aliquam blandit eros a vehicula cursus. In dolor
                                ante, mollis a porta eu, dapibus vitae justo.
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
