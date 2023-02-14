import { Component } from 'react'

import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { ProgressBar } from 'react-bootstrap';
import { GameMath } from '../../../game-math/GameMath';

import './PlayerStatistic.css'

export default class PlayerStatistic extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const level = GameMath.CalculateLevel(this.props.experiencePoints)
        const currentLevelExperiencePoints = GameMath.CalculateXP(level)
        const nextLevelExperiencePoints = GameMath.CalculateXP(level + 1)
        const experiencePointsFromCurrentLevel = this.props.experiencePoints - currentLevelExperiencePoints
        const progressPercent = experiencePointsFromCurrentLevel / (nextLevelExperiencePoints - currentLevelExperiencePoints) * 100

        return (
            <div className="stats">
                <Card style={{ width: '18rem', padding:'10px' }} className="manager-side-menu border-0 rounded-0 bg-transparent ">
                    <Card.Body className="border-bottom">
                        <div>
                            <Card.Title as="h5" className='text-center'>
                                Szint <Badge pill>{level}</Badge>
                            </Card.Title>
                            <div className="d-flex flex-row justify-content-start align-items-center">
                                <img  src="../images/icons/coin.png" alt='coin'></img>Coin
                                <Badge pill className="ms-2">{this.props.items.coins}</Badge>
                            </div>
                            <ProgressBar 
                                now={ Math.round(progressPercent) } 
                                label={`${experiencePointsFromCurrentLevel} XP`} 
                                className="rounded-0 mt-3 mb-1"
                            />
                            <div className="d-flex justify-content-center">
                                <span>
                                    { nextLevelExperiencePoints - this.props.experiencePoints } XP a szintlépésig
                                </span>
                            </div>
                        </div>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title as="h5" className='text-center'>Építőanyagok</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush" className="border-top border-bottom ">
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent text-white"
                        >   
                            <span><img  src="../images/icons/steel.png" alt='steel'></img> Vas</span>
                            <Badge bg="primary" pill>
                            { this.props.items.irons }
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent text-white"
                        >
                            <span><img  src="../images/icons/stone.png" alt='stone'></img> Kő</span>
                            <Badge bg="primary" pill>
                            { this.props.items.stones }
                            </Badge>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-center bg-transparent text-white"
                        >
                            <span><img  src="../images/icons/wood.png" alt='wood'></img> Fa</span>
                            <Badge bg="primary" pill>
                            { this.props.items.woods }
                            </Badge>
                        </ListGroup.Item>
                    </ListGroup>
                    {
                        this.props.unbuiltBuildings.length > 0 ?
                        <div>
                            <Card.Body>
                                <Card.Title as="h5">Építésre váró épületek</Card.Title>
                            </Card.Body>
                            <ListGroup variant="flush" className="border-top">
                                {
                                    this.props.unbuiltBuildings.map((building, index) => (
                                        <ListGroup.Item
                                            key={index}
                                            as="li"
                                            className="d-flex justify-content-between align-items-center bg-transparent text-white"
                                        >
                                            { building.name }
                                            <ButtonGroup aria-label="Basic example">
                                                <Button 
                                                    variant="outline-light" 
                                                    size="sm" 
                                                    onClick={() => this.props.selectWaitToBuild(building.name)}
                                                    disabled={!building.checkCanBeBuilt(
                                                        this.props.items.coins, 
                                                        this.props.items.irons, 
                                                        this.props.items.stones, 
                                                        this.props.items.woods) || this.props.waitToBuild }>
                                                    Megépít
                                                </Button>
                                                <OverlayTrigger 
                                                    trigger="focus" 
                                                    placement="right" 
                                                    overlay={
                                                        <Popover id="popover-basic" className="rounded-0">
                                                            <Popover.Header as="h3" className="bg-body">Szükséges nyersanyagok</Popover.Header>
                                                            <Popover.Body className="d-flex flex-column bg-transparent">
                                                                <span className='mb-1 fs-6'>Arany: { building.coinsForBuild }</span>
                                                                <span className='mb-1 fs-6'>Vas: { building.ironsForBuild }</span>
                                                                <span className='mb-1 fs-6'>Kő: { building.stonesForBuild }</span>
                                                                <span className='fs-6'>Fa: { building.woodsForBuild }</span>
                                                            </Popover.Body>
                                                        </Popover>
                                                    }>
                                                    <Button variant="light" size="sm">
                                                        <i className="bi bi-question-lg"></i>
                                                    </Button>
                                                </OverlayTrigger>
                                            </ButtonGroup>
                                        </ListGroup.Item>
                                    ))
                                }
                            </ListGroup>
                        </div> :
                        null
                    }
                </Card>
            </div>
        )
    }
}