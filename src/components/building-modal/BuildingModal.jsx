import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
import IslandContext from "../../contexts/IslandContext";
import moment from "moment";

import "./BuildingModal.css";

export default function BuildingModal({
  openedBuilding,
  closeBuildingModal,
  openedBuildingRemainingTime,
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

  function checkEnoughRawMaterials() {
    return (
      player.coins >= nextLevelOfBuilding.coinsForBuild &&
      player.irons >= nextLevelOfBuilding.ironsForBuild &&
      player.stones >= nextLevelOfBuilding.stonesForBuild &&
      player.woods >= nextLevelOfBuilding.woodsForBuild
    );
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
          console.log(response.data)
          setNextLevelOfBuilding(response.data);
          setIsNextLevelAvailable(true);
        })
        .catch((error) => {
          if (error.code === "ERR_NETWORK") {
            alert("Nem sikerült kapcsolódni a szerverhez.");
          }

          console.log(error)
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
      <Modal.Header className="border-0 pb-1">
        <div className="title">
          <h5>{openedBuilding.name}</h5>
          <span className="fs-5">
            SZINT:
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
                {item.quantity}db / {openedBuilding.productionInterval / 6000}{" "}
                perc &#40; max {openedBuilding.maximumProductionCount}db &#41;
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <div> Következő termelés: {moment(openedBuildingRemainingTime - (1000 * 60 * 60)).format("LTS")}</div>

        {isNextLevelAvailable && checkEnoughRawMaterials() ? (
          <div className="d-flex flex-column align-items-center unbuilt-building-card">
            <h6>Elérhető fejlesztés</h6>
            <div className="w-100 d-flex flex-row justify-content-center mb-2">
              <img
                className="next-level-building-sprite"
                alt={nextLevelOfBuilding.name}
                src={nextLevelOfBuilding.spritePath}
              />
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button className="upgrade-build-btn" onClick={upgradeBuilding}>
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
                      {/* <div>{openedBuilding.description}</div> */}
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
        ) : null}
      </Modal.Body>
    </Modal>
  );
}