import { Component } from "react";
import Card from 'react-bootstrap/Card';
import { Badge } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { OverlayTrigger } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';

import style from './PartPlayerStatistic.module.css'

export default class PartPlayerStatistic extends Component {
    constructor(props) {
        super()
    }

    render() {
        return (
            <div className={style.stats}>
                <Card style={{ width: '18rem' }} className="border-0 rounded-0">
                    <Card.Body>
                        <Card.Title as="h6" className="card-subtitle mb-2 text-muted">Sziget adatai</Card.Title>
                        <Card.Title as="h5">Szint</Card.Title>
                        <ProgressBar now={60} className="rounded-0"/>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}