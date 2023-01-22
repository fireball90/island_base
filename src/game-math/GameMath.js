export class GameMath {
    static CalculateLevel(experiencePoints) {
        return Math.floor(Math.sqrt(experiencePoints))
    }
    static CalculateXP(level) {
        return level ** 2
    }
}