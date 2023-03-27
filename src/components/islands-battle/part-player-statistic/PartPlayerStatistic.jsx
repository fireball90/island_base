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
                    <Card.Body>
                        <Card.Title as="h5">
                            Szint <Badge pill>{level}</Badge>
                        </Card.Title>
                        <ProgressBar 
                            now={ Math.round(progressPercent) } 
                            label={`${experiencePointsFromCurrentLevel} XP`} 
                            className="rounded-0 mt-3 mb-1"
                        />
                        <div className="d-flex justify-content-center">
                            <span className="text-muted">
                                { nextLevelExperiencePoints - this.props.experiencePoints } TP a szintlépésig
                            </span>
                        </div>
                    </Card.Body>
                    <Card.Body>
                        <Card.Title as="h5" className="mb-2">Képességpontok</Card.Title>
                        <Card.Text>
                            Elérhető:
                            <Badge pill className="ms-1">
                                { this.props.availableTalentPoints - (this.props.editedStrength + this.props.editedAbility + this.props.editedIntelligence) }
                            </Badge>
                        </Card.Text>
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
                                        { this.props.strength + this.props.editedStrength }
                                    </Badge>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button
                                            variant="outline-primary" 
                                            size="sm" 
                                            onClick={() => this.props.increaseEditedStrengthPoints()}
                                        >
                                            <i className="bi bi-plus-lg"></i>
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
                                        { this.props.ability + this.props.editedAbility }
                                    </Badge>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button
                                            variant="outline-primary" 
                                            size="sm" 
                                            onClick={() => this.props.increaseEditedAbilityPoints()}
                                        >
                                            <i className="bi bi-plus-lg"></i>
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
                                        { this.props.intelligence + this.props.editedIntelligence }
                                    </Badge>
                                    <ButtonGroup aria-label="Basic example">
                                            <Button
                                                variant="outline-primary" 
                                                size="sm"
                                                onClick={() => this.props.increaseEditedIntelligencePoints()} 
                                            >
                                                <i className="bi bi-plus-lg"></i>
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
                    {
                        this.props.talentPointsIsEditing ?
                        (
                            <Card.Body>
                                <div className="d-flex justify-content-center">
                                    <Button 
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => this.props.dropEditedTalentPoints()}>
                                        Mégse
                                    </Button>
                                    <Button 
                                        variant="primary"
                                        size="sm"
                                        onClick={() => this.props.saveEditedTalentPoints()}
                                        >
                                        Mentés
                                    </Button>
                                </div>
                            </Card.Body>
                        ) : null
                    }
                    <Card.Body>
                        <Card.Title as="h5">Bónuszok</Card.Title>
                        <Card.Text>A templomod ad +{this.props.churchLevel * 10}% extra szerencsét</Card.Text>
                    </Card.Body>
                    {
                        this.props.blockBattleTimeStamp ? (
                            <Card.Footer className="bg-white border-0">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        Csata zárolva 
                                    </div>
                                    <div className="fw-bold">
                                        {this.props.blockBattleTimeStamp?.getHours() - 1}h { this.props.blockBattleTimeStamp?.getMinutes() }m { this.props.blockBattleTimeStamp?.getSeconds() }s
                                    </div>
                                </div>
                            </Card.Footer>
                        ) : null
                    }
                </Card>
            </div>
        )
    }
}