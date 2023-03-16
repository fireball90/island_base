import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { ButtonGroup } from 'react-bootstrap'
import { OverlayTrigger } from 'react-bootstrap'
import { Popover } from 'react-bootstrap'
import CardHeader from 'react-bootstrap/esm/CardHeader'

import style from './UnbuiltBuilding.module.css'

export default function UnbuiltBuilding({
    building,
    isLocked,
}) {

    return (
        <div className={style.building}>
            <Card className='border-0 rounded-0'>
                <CardHeader className='text-center'>
                    {building.name}
                </CardHeader>
                <Card.Img variant='top' src={building.spritePath}></Card.Img>
                <Card.Body>
                    <ButtonGroup aria-label="Basic example" className='d-flex justify-content-center'>
                        <Button>
                            Megépít
                        </Button>
                        <OverlayTrigger
                            trigger="focus"
                            placement="top"
                            overlay={
                                <Popover id="popover-basic" className="rounded-0">
                                    <Popover.Header as="h3" className="bg-body">Leírás</Popover.Header>
                                    <Popover.Body className="d-flex flex-column bg-transparent">
                                        {building.description}
                                    </Popover.Body>
                                </Popover>
                            }>
                            <Button variant="outline-primary" size="sm">
                                <i className="bi bi-question-lg"></i>
                            </Button>
                        </OverlayTrigger>
                    </ButtonGroup>
                </Card.Body>
            </Card>
        </div>
    )
}