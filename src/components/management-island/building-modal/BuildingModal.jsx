import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import IslandContext from "../../../contexts/IslandContext";

import "./BuildingModal.css";

export default function BuildingModal({
  openedBuilding,
  closeBuildingModal,
}) {
  const { player, setPlayer, buildings, setBuildings } =
    useContext(IslandContext);

  const [nextLevelOfBuilding, setNextLevelOfBuilding] = useState();
  const [isNextLevelAvailable, setIsNextLevelAvailable] = useState(false);

  function upgradeBuilding() {
    axios
      .post(
        `https://localhost:7276/api/Building/UpgradeBuilding?type=${openedBuilding.buildingType}`
      )
      .then((response) => {
        const upgradedBuilding = response.data;

        const buildingsWithoutOpened = buildings.filter(
          (building) => building.id !== openedBuilding.id
        );
        buildingsWithoutOpened.push(upgradedBuilding);

        setBuildings([...buildingsWithoutOpened]);
        setPlayer({
          ...player,
          coins: player.coins - upgradedBuilding.coinsForBuild,
          woods: player.woods - upgradedBuilding.woodsForBuild,
          stones: player.stones - upgradedBuilding.stonesForBuild,
          irons: player.irons - upgradedBuilding.ironsForBuild,
          experience: player.experience + upgradedBuilding.experienceReward,
        });

        closeBuildingModal();
      })
      .catch(() => {
        alert("Nem sikerült kapcsolódni a szerverhez.");
      });
  }

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
    if (openedBuilding.maxLevel > openedBuilding.level) {
      axios
        .get(
          `https://localhost:7276/api/Building/GetNextLevelOfBuilding?type=${openedBuilding.buildingType}`
        )
        .then((response) => {
          setNextLevelOfBuilding(response.data);
          setIsNextLevelAvailable(true);
        })
        .catch(() => {
          alert("Nem sikerült kapcsolódni a szerverhez.");
        });
    }
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
          <span className="fs-5">
            <span className="text-warning"> {openedBuilding.level}</span>
          </span>
        </div>
        <button className="close" onClick={() => closeBuildingModal()}></button>
      </Modal.Header>
      <Modal.Body>
        <ListGroup>
          {notNullProducedItems(openedBuilding).map((item, index) => (
            <ListGroup.Item
              key={index}
              className="border-0 w-100 text-black d-flex justify-content-between bg-warning mb-3"
            >
              <div>Termelt {item.name}</div>
              <div>
                {item.quantity}db / {openedBuilding.productionInterval / 60000}{" "}
                perc &#40; max {openedBuilding.maximumProductionCount}db &#41;
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
        {isNextLevelAvailable ? (
          <div className="next-level-building-card">
            <h6>Következő szint</h6>
            <div>
              {/* <img
                className="next-level-building-sprite"
                alt={nextLevelOfBuilding.name}
                src={nextLevelOfBuilding.spritePath}
              /> */}
            </div>
            <div>
              <button onClick={() => upgradeBuilding()}>
                Fejlesztés
              </button>
              <OverlayTrigger
                trigger="focus"
                placement="top"
                overlay={
                  <Popover id="popover-basic" className="rounded-0">
                    <Popover.Header as="h3" className="bg-body">
                      Szükséges anyagok
                    </Popover.Header>
                    <Popover.Body className="d-flex flex-column bg-transparent text-center">
                      <div>Érmék: {openedBuilding.coinsForBuild}</div>
                      <div>Vas: {openedBuilding.stonesForBuild}</div>
                      <div>Kő: {openedBuilding.stonesForBuild}</div>
                      <div>Fa: {openedBuilding.woodsForBuild}</div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <button className="build-question-btn">
                  <img
                    alt="Leírás"
                    title="Leírás"
                    src="../images/ui/kerdojel_btn.png"
                  ></img>
                </button>
              </OverlayTrigger>
            </div>
          </div>
        ) : <div>Nem érhető el további fejlesztés</div>}
      </Modal.Body>
    </Modal>
  );
}