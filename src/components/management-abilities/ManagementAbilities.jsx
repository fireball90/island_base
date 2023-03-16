import { useContext } from "react"
import { Button } from "react-bootstrap"
import { PlayerContext } from "../../App"

export default function ManagementAbilities() {
    const { player } = useContext(PlayerContext)
    
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
                        <Button>+</Button>
                        <Button>?</Button>
                    </div>
                </div>
                <div className="d-flex flex-column text-center text-white p-2">
                    <span>Ügyesség</span>
                    <span className="fs-5">10</span>
                    <div>
                        <Button>+</Button>
                        <Button>?</Button>
                    </div>
                </div>
                <div className="d-flex flex-column text-center text-white p-2">
                    <span>Intelligencia</span>
                    <span className="fs-5">10</span>
                    <div>
                        <Button>+</Button>
                        <Button>?</Button>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center gap-2">
                <Button>Mentés</Button>
                <Button>Visszavonás</Button>
            </div>
        </div>
    )
}