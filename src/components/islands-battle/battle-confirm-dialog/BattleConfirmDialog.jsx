import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import style from "./BattleConfirmDialog.css";

export default function BattleConfirmDialog({ close, attack }) {
  return (
    <div >
    <Modal show={true} centered classname={style.battleContainer}>

      <Modal.Header className="border-0">
        <Modal.Title>Csata megerősítése</Modal.Title>
      </Modal.Header>
      <Modal.Body>Biztosan megtámadja a kiválasztott szigetet?</Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={() => close()}>Mégse</Button>
        <Button onClick={() => attack()}>Támad</Button>
      </Modal.Footer>

    </Modal>
    </div>
  );
}