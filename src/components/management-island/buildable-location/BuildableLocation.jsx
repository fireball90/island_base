import style from './BuildableLocation.module.css'
import classNames from "classnames";

export default function BuildableLocation(props) {
    return (
        <div 
            className={style.buildableLocation}
            onClick={() => props.buildBuilding(props.xCoordinate, props.yCoordinate)}
        ></div>
    )
}