import React from 'react';
import { Badge, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import "./PVPConfirmDialog.css"

export default function PVPConfirmDialog({ 
    attackedEnemyIsland, 
    availableTalentPoints, 
    attackEnemyIsland, 
    closePVPConfirmDialog 
}) {
    return (
        <Modal
            show={attackedEnemyIsland}
            centered
        >
            <Modal.Header className="border-0">
                <Modal.Title>Csata megerősítése</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="fw-bold mb-2">Biztosan megtámadod <span className="text-primary">{ attackedEnemyIsland?.username }</span> játékost?</div>
                {
                    availableTalentPoints != 0 ? (
                        <p>
                            <Badge pill>{ availableTalentPoints }</Badge> fel nem használt képességpontod van. A mégse gombra kattintva elköltheted őket, és erősödhetsz a harc előtt.
                        </p>
                    ) :
                    (
                        <p>
                            Kattints a támad gombra, ha úgy érzed, hogy készen állsz a harcra.
                        </p>
                    )
                }
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button 
                    variant="outline-primary" 
                    onClick={() => closePVPConfirmDialog()}>
                    Mégse
                </Button>
                <Button 
                    variant="primary"
                    onClick={() => attackEnemyIsland(attackedEnemyIsland.playerId)}
                >
                    Támad
                </Button>
            </Modal.Footer>
        </Modal>
    )
}