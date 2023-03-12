import { ProgressBar } from "react-bootstrap"
import { GameMath } from "../../game-math/GameMath"

import style from './ExperienceBar.module.css'

export default function ExperienceBar({ experiencePoints }) {
    const level = GameMath.CalculateLevel(experiencePoints)
    const currentLevelExperiencePoints = GameMath.CalculateXP(level)
    const nextLevelExperiencePoints = GameMath.CalculateXP(level + 1)
    const experiencePointsFromCurrentLevel = experiencePoints - currentLevelExperiencePoints
    const progressPercent = experiencePointsFromCurrentLevel / (nextLevelExperiencePoints - currentLevelExperiencePoints) * 100

    return (
        <div className={style.experienceBar}>
            <img src="../images/ui/xpbar.png"></img>
            <div className={style.experienceContent}>
                <ProgressBar
                    now={Math.round(progressPercent)}
                    label={`${experiencePointsFromCurrentLevel} XP`}
                    variant="danger"
                />
                <span>
                    {nextLevelExperiencePoints - experiencePoints} XP a szintlépésig
                </span>
            </div>
        </div>
    )
}