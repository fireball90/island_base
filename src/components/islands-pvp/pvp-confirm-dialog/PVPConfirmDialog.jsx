import React from 'react';
import { Button } from 'react-bootstrap';
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
            size="lg"
        >
            <Modal.Header>
                Csata megerősítése
            </Modal.Header>
            <Modal.Body>
                <h5>Készülsz megtámadni <span className="text-primary">{ attackedEnemyIsland?.username }</span> játékost!</h5>
                {
                    availableTalentPoints != 0 ? (
                        <p>
                            { availableTalentPoints } fel nem használt képességpontod van. A mégse gombra kattintva elköltheted őket, és erősödhetsz a harc előtt.
                        </p>
                    ) :
                    (
                        <p>
                            Kattints a támad gombra, ha úgy érzed, hogy készen állsz a harcra.
                        </p>
                    )
                }
            </Modal.Body>
            <Modal.Footer>
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