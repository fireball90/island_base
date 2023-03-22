import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import PlayerContext from "../../contexts/PlayerContext";
import { GameHelper } from "../../game-helper/GameHelper";

import "./BuildingModal.css";

export default function BuildingModal({ openedBuilding, closeBuildingModal }) {
  const { player, setPlayer } = useContext(PlayerContext);

  const [nextLevelOfBuilding, setNextLevelOfBuilding] = useState();
  const [isUpgradable, setIsUpgradable] = useState(false);

  function notNullProducedItems() {
    const notNullProducedItems = [];

    if (openedBuilding.producedCoins > 0)
      notNullProducedItems.push({
        name: "érmék",
        quantity: openedBuilding.producedCoins,
      });
    if (openedBuilding.producedIrons > 0)
      notNullProducedItems.push({
        name: "vas",
        quantity: openedBuilding.producedIrons,
      });
    if (openedBuilding.producedStones > 0)
      notNullProducedItems.push({
        name: "kő",
        quantity: openedBuilding.producedStones,
      });
    if (openedBuilding.producedWoods > 0)
      notNullProducedItems.push({
        name: "fa",
        quantity: openedBuilding.producedWoods,
      });

    return notNullProducedItems;
  }

  useEffect(() => {
    console.log(openedBuilding);

    axios
      .get(
        `https://localhost:7276/api/Building/GetNextLevelOfBuilding?type=${openedBuilding.buildingType}`
      )
      .then((response) => {
        setNextLevelOfBuilding(response.data);
        setIsUpgradable(true);
      })
      .catch(() => {
        alert(
          "Nem sikerült lekérdezni a fejlesztéshez szükséges követelményeket."
        );

        setIsUpgradable(false);
      });
  }, []);

  return (
    <Modal
      className="building-modal"
      show={true}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="border-0">
        <div className="title">
          <h5>{openedBuilding.name}</h5>
          <span>SZINT {openedBuilding.level}</span>
        </div>
        <button className="close" onClick={() => closeBuildingModal()}></button>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {notNullProducedItems(openedBuilding).map((item, index) => (
            <ListGroup.Item
              key={index}
              className=" border-0 w-100 bg-danger text-white d-flex justify-content-between"
            >
              <div>Termelt {item.name}</div>
              <div>
                {item.quantity}db / {openedBuilding.productionInterval / 6000}{" "}
                perc &#40; max {openedBuilding.maximumProductionCount}db &#41;
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        {isUpgradable ? (
          <div className="d-flex flex-column align-items-center unbuilt-building-card">
            <h6>Elérhető fejlesztés</h6>
            <div className="w-100 d-flex flex-row justify-content-center">
              <img
                className="next-level-building-sprite"
                alt={nextLevelOfBuilding.name}
                src={nextLevelOfBuilding.spritePath}
              />
            </div>
            <Button variant="warning">Fejlesztés</Button>
            <OverlayTrigger
              trigger="focus"
              placement="top"
              overlay={
                <Popover id="popover-basic" className="rounded-0">
                  <Popover.Header as="h3" className="bg-body">
                    Leírás
                  </Popover.Header>
                  <Popover.Body className="d-flex flex-column bg-transparent">
                    <div>{openedBuilding.description}</div>
                    <div>Érmék: {openedBuilding.coinsForBuild}</div>
                    <div>Vas: {openedBuilding.stonesForBuild}</div>
                    <div>Kő: {openedBuilding.stonesForBuild}</div>
                    <div>Fa: {openedBuilding.woodsForBuild}</div>
                  </Popover.Body>
                </Popover>
              }
            >
              <Button variant="outline-warning" size="sm">
                <i className="bi bi-question-lg"></i>
              </Button>
            </OverlayTrigger>
          </div>
        ) : null}
      </Modal.Body>
    </Modal>
  );
}
