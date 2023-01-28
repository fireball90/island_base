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
        <Modal.Header>
            <div>
                <h5 className="mb-1">Csata eredményének megtekintése</h5>
                <div className="text-muted"> Az idővonalon részletesen végigkövetheted a csata történeseit</div>
            </div>
        </Modal.Header>
        <Modal.Body>
            <div className={style.battleReportContainer}>
                <ListGroup className="rounded-0">
                    {
                        battleResult?.battleReports.map((report, index) => (
                            <ListGroup.Item key={index}>
                                <div className="d-flex mb-3">
                                    <div className="w-25">
                                        <span>{ report.attackerUsername }</span>
                                    </div>
                                    <div className="w-75">
                                        <div className="d-flex justify-content-between w-100">
                                            <div>{ report.attackerMessage }</div>
                                            <div className="text-primary">{ report.attackerDamage } sebzés</div>
                                        </div>
                                        <div className="text-primary">{ report.enemyUsername } fentmaradt életereje: { report.enemyRemainingHealth }</div>
                                    </div>
                                </div>
                                <div className="d-flex mb-2">
                                    <div className="w-25">
                                        <span>{ report.enemyUsername }</span>
                                    </div>
                                    <div className="w-75">
                                        <div className="d-flex justify-content-between w-100">
                                            <div>{ report.enemyMessage }</div>
                                            <div className="text-primary">{ report.enemyDamage } sebzés</div>
                                        </div>
                                        <div className="text-primary">{ report.attackerUsername } fentmaradt életereje: { report.attackerRemainingHealth }</div>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))
                    }
                </ListGroup>
            </div>
            <div className="mt-3">
                <div>
                    <h5 className="text-center">{ battleResult?.winnerUsername } nyert</h5>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="w-50 d-flex justify-content-between align-items-center mb-1 pb-1 pt-1 border-bottom">Szerzett fa<Badge pill>{ battleResult?.winnedItems.woods }</Badge></div>
                    <div className="w-50 d-flex justify-content-between align-items-center mb-1 pb-1 pt-1 border-bottom">Szerzett kő<Badge pill>{ battleResult?.winnedItems.stones}</Badge></div>
                    <div className="w-50 d-flex justify-content-between align-items-center mb-1 pb-1 pt-1 border-bottom">Szerzett vas<Badge pill>{ battleResult?.winnedItems.irons }</Badge></div>
                    <div className="w-50 d-flex justify-content-between align-items-center mb-1 pb-1 pt-1 border-bottom">Szerzett érme<Badge pill>{ battleResult?.winnedItems.coins }</Badge></div>
                    <div className="w-50 d-flex justify-content-between align-items-center pt-1">Szerzett tapasztalati pont<Badge pill>{ battleResult?.winnedItems.experiencePoints }</Badge></div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => resetBattleReport()}>Rendben</Button>
        </Modal.Footer>
      </Modal> 
    )
}