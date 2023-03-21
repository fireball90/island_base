import { useContext } from "react"
import { Button } from "react-bootstrap"
import PlayerContext from "../../contexts/PlayerContext"
import style from "./ManagementAbilities.module.css";

export default function ManagementAbilities() {
    return (
        <div>
            <div className="text-center">
                <h5 className="text-white">Elérhető képességpontok</h5>
                <span className="fs-3 text-white">10</span>
            </div>
            <div className="d-flex flex-row justify-content-center gap-3">
                <div className="d-flex flex-column text-center text-white p-2">
                    <span>Erő</span>
                    <span className="fs-5">10</span>
                    <div>
                        <button className={style.btnBg}><img alt="Plusz" title="Plusz" src="../images/ui/plusz_btn_inactive.png" ></img></button>
                        <button className={style.btnBg}><img alt="Kérdés" title="Kérdés" src="../images/ui/kerdojel_btn.png" ></img></button>
                    </div>
                </div>
                <div className="d-flex flex-column text-center text-white p-2">
                    <span>Ügyesség</span>
                    <span className="fs-5">10</span>
                    <div>
                        <button className={style.btnBg}><img alt="Plusz" title="Plusz" src="../images/ui/plusz_btn_inactive.png" ></img></button>
                        <button className={style.btnBg}><img alt="Kérdés" title="Kérdés" src="../images/ui/kerdojel_btn.png" ></img></button>
                    </div>
                </div>
                <div className="d-flex flex-column text-center text-white p-2">
                    <span>Intelligencia</span>
                    <span className="fs-5">10</span>
                    <div>
                        <button className={style.btnBg}><img alt="Plusz" title="Plusz" src="../images/ui/plusz_btn_inactive.png" ></img></button>
                        <button className={style.btnBg}><img alt="Kérdés" title="Kérdés" src="../images/ui/kerdojel_btn.png" ></img></button>
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