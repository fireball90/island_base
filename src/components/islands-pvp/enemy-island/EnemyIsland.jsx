import React, { Component } from 'react';
import { Button, OverlayTrigger } from "react-bootstrap";
import { Badge } from 'react-bootstrap';
import { GameMath } from '../../../game-math/GameMath';
import MovablePopover from "../../island-management/movable-popover/MovablePopover"

import style from "./EnemyIsland.module.css"


export class EnemyIsland extends Component {
    constructor(props) {
        super(props)

        this.ref = React.createRef()
    }

    render() {
        const health = 100 + (GameMath.CalculateLevel(this.props.experiencePoints) * 10)
        const level = GameMath.CalculateLevel(this.props.experiencePoints)

        return (
            <div 
                className={style.island} 
                style={{backgroundImage: `url(${this.props.sprite})`}}
            >
                <div className={style.position} ref={this.ref}>
                    <OverlayTrigger
                        show={true}
                        container={this.ref}
                        trigger={null}
                        overlay={
                            <MovablePopover
                                zoom={this.props.zoom} 
                            >
                                <div className="mb-3 text-center">
                                    <div style={{ width: '6rem' }} className="mb-1">
                                        <span className="fw-bold">{this.props.username}</span>
                                    </div>
                                    <div className="d-flex align-items-baseline justify-content-center">
                                        <Badge>{level}</Badge><span className="ms-1">szint</span>
                                    </div>
                                    <div className="d-flex align-items-baseline justify-content-center">   
                                        <Badge>{health}</Badge><span className="ms-1">élet</span>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <Button>
                                        <i className="bi bi-fire"></i>
                                    </Button>
                                </div>
                            </MovablePopover>
                        }
                    >
                        <div></div>
                    </OverlayTrigger>
                </div>
            </div>
        )
    }
}