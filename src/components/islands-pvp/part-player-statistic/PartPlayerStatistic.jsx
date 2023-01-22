import { Component } from "react";
import Card from 'react-bootstrap/Card';
import { Badge, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { GameMath } from "../../../game-math/GameMath";
import { ButtonGroup } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";
 
import style from './PartPlayerStatistic.module.css'

export default class PartPlayerStatistic extends Component {
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
            <div className={style.stats}>
                <Card style={{ width: '18rem' }} className="border-0 rounded-0">
                    <Card.Body className="border-bottom">
                        <Card.Title as="h5">
                            Szint <Badge>{level}</Badge>
                        </Card.Title>
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
                    </Card.Body>
                    <Card.Body>
                        <Card.Title as="h5" className="mb-0">Képességpontok</Card.Title>
                    </Card.Body>
                    <ListGroup variant="flush" className="rounded-0 border-top border-bottom">
                        <ListGroup.Item>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <span>Erő: </span>
                                <div>
                                    <Badge 
                                        bg="primary" 
                                        pill
                                        className="me-2"
                                    >
                                        { this.props.strength }
                                    </Badge>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button
                                            variant="outline-primary" 
                                            size="sm" 
                                        >
                                            <i class="bi bi-plus-lg"></i>
                                        </Button>
                                        <OverlayTrigger 
                                            trigger="focus" 
                                            placement="right" 
                                            overlay={
                                                <Popover id="popover-basic" className="rounded-0">
                                                    <Popover.Body className="d-flex flex-column">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                        Aliquam ornare turpis eu lorem bibendum, id pretium dolor rutrum. 
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <Button variant="outline-primary" size="sm">
                                                <i className="bi bi-question-lg"></i>
                                            </Button>
                                        </OverlayTrigger>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <span>Ügyesség:</span>
                                <div>
                                    <Badge 
                                        bg="primary" 
                                        pill
                                        className="me-2"
                                        >
                                        { this.props.ability }
                                    </Badge>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button
                                            variant="outline-primary" 
                                            size="sm" 
                                        >
                                            <i class="bi bi-plus-lg"></i>
                                        </Button>
                                        <OverlayTrigger 
                                            trigger="focus" 
                                            placement="right" 
                                            overlay={
                                                <Popover id="popover-basic" className="rounded-0">
                                                    <Popover.Body className="d-flex flex-column">
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                        Aliquam ornare turpis eu lorem bibendum, id pretium dolor rutrum. 
                                                    </Popover.Body>
                                                </Popover>
                                            }>
                                            <Button variant="outline-primary" size="sm">
                                                <i className="bi bi-question-lg"></i>
                                            </Button>
                                        </OverlayTrigger>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="d-flex flex-row align-items-center justify-content-between">
                                <span>Intelligencia:</span>
                                <div>
                                    <Badge 
                                        bg="primary" 
                                        pill
                                        className="me-2"
                                    >
                                        { this.props.intelligence }
                                    </Badge>
                                    <ButtonGroup aria-label="Basic example">
                                            <Button
                                                variant="outline-primary" 
                                                size="sm" 
                                            >
                                                <i class="bi bi-plus-lg"></i>
                                            </Button>
                                            <OverlayTrigger 
                                                trigger="focus" 
                                                placement="right" 
                                                overlay={
                                                    <Popover id="popover-basic" className="rounded-0">
                                                        <Popover.Body className="d-flex flex-column">
                                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                                                            Aliquam ornare turpis eu lorem bibendum, id pretium dolor rutrum. 
                                                        </Popover.Body>
                                                    </Popover>
                                                }>
                                                <Button variant="outline-primary" size="sm">
                                                    <i className="bi bi-question-lg"></i>
                                                </Button>
                                            </OverlayTrigger>
                                    </ButtonGroup>
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Title as="h5">Bónuszok</Card.Title>
                        <Card.Text>A templomod ad +{this.props.churchLevel * 10}% extra szerencsét</Card.Text>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}