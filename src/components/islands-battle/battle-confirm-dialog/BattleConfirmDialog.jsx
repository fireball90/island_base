import React from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

import "./BattleConfirmDialog.css";

export default function BattleConfirmDialog({ close, attack }) {
  return (
    <Modal show={true} centered>
      <Modal.Header className="border-0">
        <Modal.Title>Csata megerősítése</Modal.Title>
      </Modal.Header>
      <Modal.Body>Biztosan megtámadja a kiválasztott szigetet?</Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={() => close()}>Mégse</Button>
        <Button onClick={() => attack()}>Támad</Button>
      </Modal.Footer>
    </Modal>
  );
}