import Card from 'react-bootstrap/Card';
import { CloseButton } from 'react-bootstrap';

import "./BuildingRequestNotification.css"
import { useContext } from 'react';
import IslandContext from '../../../contexts/IslandContext';

export default function BuildingRequestNotification () {
    const { buildingToBeBuild, interruptBuildingRequest } = useContext(IslandContext);

    return (
        <div className="building-notification">
            <Card style={{ width: '18rem' }} className="border-0 rounded-0">
                <Card.Body className="d-flex justify-content-between">
                    <div>
                        Készülsz megépíteni ezt az épületet: <b>{ buildingToBeBuild.name }</b>
                    </div>
                    <CloseButton onClick={() => interruptBuildingRequest()}/> 
                </Card.Body>
            </Card>
        </div>
    )
}