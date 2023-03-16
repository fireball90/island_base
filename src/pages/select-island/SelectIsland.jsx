import { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import "./SelectIsland.css";
import axios from "axios";
import { HudContext, PlayerContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";

export default function SelectIsland() {
  const { setIsHudDisplayed } = useContext(HudContext);
  const { setPlayer } = useContext(PlayerContext);

  const [selectedIsland, setSelectedIsland] = useState(null);
  const [creatingPending, setCreatingPending] = useState(false);

  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    setCreatingPending(true);

    axios
      .post(
        `https://localhost:7276/api/Player/CreatePlayer?island=${selectedIsland}`
      )
      .then((response) => {
        setPlayer(response.data);
        navigate("/island");
      })
      .catch(() => {
        alert("Nem sikerült kapcsolódni a szerverhez");
      })
      .finally(() => {
        setCreatingPending(false);
      });
  }

  function selectIslandHandler(island) {
    setSelectedIsland(island);
  }

  useEffect(() => {
    setIsHudDisplayed(false);
  }, []);

  return (
    <Layout title={"Válassz szigetet"} navigations={[]} close={false}>
      <form
        className="island-select-form"
        onSubmit={(event) => submitHandler(event)}
      >
        <div className="card-container">
          <Card
            className={selectedIsland === "Europian" ? "bg-primary" : null}
            onClick={() => selectIslandHandler("Europian")}
          >
            <Card.Img variant="top" src="../assets/europian_island.png" />
            <Card.Body className="text-center">
              <Card.Title>Európai sziget</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className={selectedIsland === "Indian" ? "bg-primary" : null}
            onClick={() => selectIslandHandler("Indian")}
          >
            <Card.Img variant="top" src="../assets/indian-island.png" />
            <Card.Body className="text-center">
              <Card.Title>Indián sziget</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className={selectedIsland === "Viking" ? "bg-primary" : null}
            onClick={() => selectIslandHandler("Viking")}
          >
            <Card.Img variant="top" src="../assets/viking_island.png" />
            <Card.Body className="text-center">
              <Card.Title>Viking sziget</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <Card
            className={selectedIsland === "Japan" ? "bg-primary" : null}
            onClick={() => selectIslandHandler("Japan")}
          >
            <Card.Img variant="top" src="../assets/japanese_island.png" />
            <Card.Body className="text-center">
              <Card.Title>Japán sziget</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div class="save-button-container">
          <Button disabled={!selectedIsland || creatingPending} type="submit">
            Sziget mentése
          </Button>
        </div>
      </form>
    </Layout>
  );
}