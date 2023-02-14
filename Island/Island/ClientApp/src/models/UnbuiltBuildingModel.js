export class UnbuiltBuildingModel {
    constructor(
        name, coinsForBuild, ironsForBuild, stonesForBuild, woodsForBuild) {
        
        this.name = name
        this.coinsForBuild = coinsForBuild
        this.ironsForBuild = ironsForBuild
        this.stonesForBuild = stonesForBuild
        this.woodsForBuild = woodsForBuild
    }

    checkCanBeBuilt(
        availableCoins, availableIrons, availableStones, availableWoods) {
        
        return ( 
            this.coinsForBuild <= availableCoins && 
            this.ironsForBuild <= availableIrons && 
            this.stonesForBuild <= availableStones && 
            this.woodsForBuild <= availableWoods )
    }
}