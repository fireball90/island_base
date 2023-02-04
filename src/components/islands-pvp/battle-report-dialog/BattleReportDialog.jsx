import Modal from 'react-bootstrap/Modal';
import { Badge, Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';

import style from "./BattleReportDialog.module.css"

export default function BattleReportDialog({ battleResult, resetBattleReport }) {
    return (
        <Modal
            show={battleResult}
            size="lg"
            centered
        >
            <Modal.Header className="border-0">
                <div>
                    <Modal.Title>{battleResult?.won ? 'Gratulálunk, győztél!' : 'Sajnáljuk, vesztettél!'}</Modal.Title>
                    <div>Tekintsd meg a részletes csatajelentést.</div>
                </div>
            </Modal.Header>
            <div className={style.battleReportContainer}>
                <ListGroup className="rounded-0">
                    {
                        battleResult?.battleReports.map((report, index) => (
                            <ListGroup.Item 
                                key={index}
                                className="border-0">
                                <div className="d-flex mb-4">
                                    <div className="w-25 d-flex align-items-center">
                                        <span className="fw-bold">{ report.attackerUsername }</span>
                                    </div>
                                    <div className="w-75">
                                        <div className="d-flex justify-content-between w-100">
                                            <div>{ report.attackerMessage }</div>
                                            <div className="text-primary">{ report.attackerDamage } sebzés</div>
                                        </div>
                                        <div className="text-primary"><span className="fw-bold">{ report.enemyUsername }</span>  fentmaradt életereje: { report.enemyRemainingHealth }</div>
                                    </div>
                                </div>
                                <div className="d-flex mb-2">
                                    <div className="w-25 d-flex align-items-center">
                                        <span className="fw-bold">{ report.enemyUsername }</span>
                                    </div>
                                    <div className="w-75">
                                        <div className="d-flex justify-content-between w-100">
                                            <div>{ report.enemyMessage }</div>
                                            <div className="text-primary">{ report.enemyDamage } sebzés</div>
                                        </div>
                                        <div className="text-primary"><span className="fw-bold">{ report.attackerUsername }</span> fentmaradt életereje: { report.attackerRemainingHealth }</div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <Modal.Body>
                <div className="mt-3">
                    <div className="d-flex flex-row justify-content-around">
                        <div className='d-flex align-items-center'>
                            <i className="bi bi-circle"></i>
                            <Badge 
                                pill
                                className="ms-1"    
                            >
                                { battleResult?.loot.woods }
                            </Badge>
                        </div>
                        <div className='d-flex align-items-center'>
                            <i className="bi bi-circle"></i>
                            <Badge 
                                pill
                                className="ms-1"    
                            >
                                { battleResult?.loot.stones }
                            </Badge>
                        </div>                  
                        <div className='d-flex align-items-center'>
                            <i className="bi bi-circle"></i>
                            <Badge 
                                pill
                                className="ms-1"    
                            >
                                { battleResult?.loot.irons }
                            </Badge>
                        </div>                  
                        <div className='d-flex align-items-center'>
                            <i className="bi bi-circle"></i>
                            <Badge 
                                pill
                                className="ms-1"    
                            >
                                { battleResult?.loot.coins }
                            </Badge>
                        </div>
                        <div className='d-flex align-items-center'>
                            <i className="bi bi-circle"></i>
                            <Badge 
                                pill
                                className="ms-1"    
                            >
                                { battleResult?.loot.experiencePoints }
                            </Badge>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer
                closeButton 
                className="border-0">
                <Button onClick={() => resetBattleReport()}>Rendben</Button>
            </Modal.Footer>
        </Modal> 
    )
}