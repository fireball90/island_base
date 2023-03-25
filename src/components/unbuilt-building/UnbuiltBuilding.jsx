import { useContext } from "react";
import { Card } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate } from "react-router-dom";
import IslandContext from "../../contexts/IslandContext";

import style from "./UnbuiltBuilding.module.css";

export default function UnbuiltBuilding({ building, isBuilt, hasEnoughMaterials }) {
  const { setBuildingToBeBuilt } = useContext(IslandContext);
  const navigate = useNavigate();

  function handleBuildRequest() {
    setBuildingToBeBuilt(building);
    navigate("/island");
  }

  return !isBuilt ? (
    <div className={style.building}>
      {
        !hasEnoughMaterials ? (
          <div className={style.lock}></div>
        ) : null
      }
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
              <button
                className={style.btnBuilding}
                onClick={handleBuildRequest}
              >
                Megépít
              </button>
              <OverlayTrigger
                trigger="focus"
                placement="bottom"
                overlay={
                  <Popover id="popover-basic" className="rounded-0">
                    <Popover.Header as="h3" className="bg-body">
                      Leírás
                    </Popover.Header>
                    <Popover.Body className="d-flex flex-column bg-transparent">
                      {building.description}
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
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  ) : null;
}