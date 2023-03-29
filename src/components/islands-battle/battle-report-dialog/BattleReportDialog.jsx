import Modal from "react-bootstrap/Modal";
import { Badge, Button } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";

import style from "./BattleReportDialog.module.css";

export default function BattleReportDialog({
  battleReports,
  resetBattleReports,
}) {
  return (
    <Modal show={true} size="lg" centered>
      <div className={style.battleContainer}>
      <Modal.Header className="border-0 text-white">
        <div>
          <Modal.Title>
            {battleReports.isWinner
              ? "Gratulálunk, győztél!"
              : "Sajnáljuk, vesztettél!"}
          </Modal.Title>
          <div>Tekintsd meg a részletes csatajelentést.</div>
        </div>
      </Modal.Header>
      <div className={style.battleReportContainer}>
        <ListGroup className="rounded-0 text-white">
          {battleReports.rounds.map((round, index) => (
            <ListGroup.Item key={index} className="border-0">
              <div className="d-flex mb-4">
                <div className="w-25 d-flex align-items-center">
                  <span className="fw-bold">{round.username}</span>
                </div>
                <div className="w-75">
                  <div className="d-flex justify-content-between w-100">
                    <div>{round.message}</div>
                    <div className="text-primary">{round.damage} sebzés</div>
                  </div>
                  <div className="text-primary">
                    {" "}
                    Ellenfél fennmaradt életereje: {round.enemyRemainingHealth}
                  </div>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <Modal.Body>
        <div className="mt-3 text-white">
          <div className="d-flex flex-row justify-content-around">
            <div className="d-flex align-items-center">
                Érmék: 
              <Badge pill className="ms-1">
                {battleReports.coins}
              </Badge>
            </div>
            <div className="d-flex align-items-center">
              Fa:
              <Badge pill className="ms-1">
                {battleReports.woods}
              </Badge>
            </div>
            <div className="d-flex align-items-center">
              Kövek:
              <Badge pill className="ms-1">
                {battleReports.stones}
              </Badge>
            </div>
            <div className="d-flex align-items-center">
              Vas:
              <Badge pill className="ms-1">
                {battleReports.irons}
              </Badge>
            </div>
            <div className="d-flex align-items-center">
              Tapasztalati pontok: 
              <Badge pill className="ms-1">
                {battleReports.experience}
              </Badge>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={() => resetBattleReports()}>Rendben</Button>
      </Modal.Footer>
      </div>
    </Modal>
  );
}