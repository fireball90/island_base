export class UnbuiltBuildingModel {
    constructor(
        name, goldsForBuild, ironsForBuild, stonesForBuild, woodsForBuild) {
        
        this.name = name
        this.goldsForBuild = goldsForBuild
        this.ironsForBuild = ironsForBuild
        this.stonesForBuild = stonesForBuild
        this.woodsForBuild = woodsForBuild
    }

    checkCanBeBuilt(
        availableGolds, availableIrons, availableStones, availableWoods) {
        
        return ( 
            this.goldsForBuild <= availableGolds && 
            this.ironsForBuild <= availableIrons && 
            this.stonesForBuild <= availableStones && 
            this.woodsForBuild <= availableWoods )
    }
}