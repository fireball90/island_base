import React from 'react'
import { Button } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';

export default function BlockMessage({ show, title, message, blockBattleTimeStamp, closeBlockBattleDialog }) {

    return show ? (
        <Modal
            show={show}
            centered
            >
            <Modal.Header 
                className="border-0">
                <Modal.Title id="contained-modal-title-vcenter">
                    { title }
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        { message }
                    </div>
                    <div className="fw-bold">
                        {
                            blockBattleTimeStamp ? ( `${blockBattleTimeStamp?.getHours() - 1}h ${ blockBattleTimeStamp?.getMinutes() }m ${ blockBattleTimeStamp?.getSeconds() }s`) : null
                        }
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button onClick={() => closeBlockBattleDialog()}>Fejlesztem a képességpontjaim</Button>
            </Modal.Footer>
        </Modal>
    ) : (
        null
    )
}