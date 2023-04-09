import { useContext } from "react";
import { Card } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate } from "react-router-dom";
import IslandContext from "../../contexts/IslandContext";

import style from "./UnbuiltBuilding.module.css";

export default function UnbuiltBuilding({
  building,
  isBuilt,
  hasEnoughMaterials,
}) {
  const { player, setBuildingToBeBuilt } = useContext(IslandContext);
  const navigate = useNavigate();

  function handleBuildRequest() {
    setBuildingToBeBuilt(building);
    navigate("/island");
  }

  return (
    <div className={isBuilt ? `${style.building} opacity-50` : `${style.building}`}>
      <Card className="border-0 rounded-0 bg-transparent">
        <CardHeader className="text-center text-white">
          <h4>{building.name}</h4>
        </CardHeader>
        <div className="d-flex justify-content-center align-items-center">
          <Card.Img variant="top" src={building.spritePath}></Card.Img>
        </div>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-center text-center p-0 m-0">
            <div className={style.btnGroup}>
              {!isBuilt ? (
                <>
                  <button
                    className={`${style.btnBuilding} font-btn`}
                    onClick={handleBuildRequest}
                    disabled={!hasEnoughMaterials && !isBuilt}
                  >
                    <span>Építés</span>
                  </button>
                  <OverlayTrigger
                    trigger="focus"
                    placement="left"
                    overlay={
                      <Popover id="popover-basic" className="rounded-0">
                        <Popover.Body className="d-flex flex-column bg-transparent">
                          <p className="text-center">{building.description}</p>
                          <div className="d-flex justify-content-center align-items-end text-center">
                            <div className="d-flex flex-column justify-content-center align-items-center">
                              <img
                                src="../images/icons/wood.png"
                                alt="wood"
                                className={
                                  building.woodsForBuild > player.woods
                                    ? "opacity-25"
                                    : ""
                                }
                              ></img>
                              <span
                                className={
                                  building.woodsForBuild > player.woods
                                    ? "opacity-25"
                                    : ""
                                }
                              >
                                Fa {building.woodsForBuild} db
                              </span>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                              <img
                                src="../images/icons/stone.png"
                                alt="stone"
                                className={
                                  building.stonesForBuild > player.stones
                                    ? "opacity-25"
                                    : ""
                                }
                              ></img>
                              <span
                                className={
                                  building.stonesForBuild > player.stones
                                    ? "opacity-25"
                                    : ""
                                }
                              >
                                Kő {building.stonesForBuild} db
                              </span>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                              <img
                                src="../images/icons/steel.png"
                                alt="steel"
                                className={
                                  building.ironsForBuild > player.irons
                                    ? "opacity-25"
                                    : ""
                                }
                              ></img>
                              <span>Vas {building.ironsForBuild} db</span>
                            </div>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                              <img
                                src="../images/icons/coin.png"
                                alt="coin"
                                className={
                                  building.coinsForBuild > player.coins
                                    ? "opacity-25"
                                    : ""
                                }
                              ></img>
                              <span
                                className={
                                  building.coinsForBuild > player.coins
                                    ? "opacity-25"
                                    : ""
                                }
                              >
                                Coin {building.coinsForBuild} db
                              </span>
                            </div>
                          </div>
                        </Popover.Body>
                      </Popover>
                    }
                  >
                    <button className={style.btnQuestionBuilding}>
                      <img
                        alt="Leírás"
                        title="Leírás"
                        src="../images/ui/kerdojel_btn.png"
                      ></img>
                    </button>
                  </OverlayTrigger>
                </>
              ) : null}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}