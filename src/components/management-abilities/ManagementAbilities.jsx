import { useContext } from "react"
import { Button } from "react-bootstrap"
import PlayerContext from "../../contexts/PlayerContext"
import style from "./ManagementAbilities.module.css";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";

export default function ManagementAbilities() {
    return (
        <div>
            <div className="text-center">
                <h5 className="text-white">Elérhető képességpontok</h5>
                <span className="fs-2 text-warning">10</span>
            </div>
            <div className="d-flex flex-row justify-content-center gap-3">
                <div className="d-flex flex-column text-center text-white p-2 stat-container">
                    <span>Erő</span>
                    <span className="fs-5 text-warning">10</span>
                    <div>
                        <button className={style.btnBg}><img alt="Plusz" title="Plusz" src="../images/ui/plusz_btn_inactive.png" ></img></button>
                        <button className={style.btnBg}><img alt="Leírás" title="Leírás" src="../images/ui/kerdojel_btn.png" ></img></button>
                    </div>
                </div>
                <div className="d-flex flex-column text-center text-white p-2 stat-container">
                    <span>Ügyesség</span>
                    <span className="fs-5 text-warning">10</span>
                    <div>
                        <button className={style.btnBg}><img alt="Plusz" title="Plusz" src="../images/ui/plusz_btn_inactive.png" ></img></button>
                        <button className={style.btnBg}><img alt="Leíráss" title="Leírás" src="../images/ui/kerdojel_btn.png" ></img></button>
                    </div>
                </div>
                <div className="d-flex flex-column text-center text-white p-2 stat-container">
                    <span>Intelligencia</span>
                    <span className="fs-5 text-warning">10</span>
                    <div>
                        <button className={style.btnBg}><img alt="Plusz" title="Plusz" src="../images/ui/plusz_btn_inactive.png" ></img></button>
                        <OverlayTrigger
                            trigger="focus"
                            placement="top"
                            overlay={
                                <Popover id="popover-basic" className="rounded-0">
                                <Popover.Header as="h3" className="bg-body">
                                    Szükséges anyagok
                                </Popover.Header>
                                <Popover.Body className="d-flex flex-column bg-transparent text-center">
                                    {/* <div>{openedBuilding.description}</div> */}
                                </Popover.Body>
                                </Popover>
                            }
                            >
                            <button className={style.btnBg}><img alt="Leírás" title="Leírás" src="../images/ui/kerdojel_btn.png" ></img></button>
                        </OverlayTrigger>                       
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center gap-2">
                <button className={style.btnBase}>Mentés</button>
                <button className={style.btnBase}>Visszavonás</button>
            </div>
        </div>
    )
}