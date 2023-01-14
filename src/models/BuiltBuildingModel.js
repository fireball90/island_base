export class BuiltBuildingModel {
    constructor (
        coordX, 
        coordY, 
        level, 
        maxLevel, 
        name, 
        buildDate,
        description, 
        imagePath, 
        goldsForUpdate, 
        ironsForUpdate, 
        stonesForUpdate, 
        woodsForUpdate, 
        productionInterval,
        lastCollectTime,
        produceGoldCount,
        produceIronsCount,
        produceStonesCount,
        produceWoodsCount,
        alreadyProducedGold,
        alreadyProducedIrons,
        alreadyProducedStones,
        alreadyProducedWoods,
        nextProductionDate) {
        
        this.coordX = coordX
        this.coordY = coordY
        this.level = level
        this.maxLevel = maxLevel
        this.name = name
        this.buildDate = buildDate
        this.description = description
        this.imagePath = imagePath
        this.goldsForUpdate = goldsForUpdate
        this.ironsForUpdate = ironsForUpdate
        this.stonesForUpdate = stonesForUpdate
        this.woodsForUpdate = woodsForUpdate
        this.productionInterval = productionInterval
        this.lastCollectTime = lastCollectTime
        this.produceGoldCount = produceGoldCount
        this.produceIronsCount = produceIronsCount
        this.produceStonesCount = produceStonesCount
        this.produceWoodsCount = produceWoodsCount
        this.alreadyProducedGold = alreadyProducedGold 
        this.alreadyProducedIrons = alreadyProducedIrons
        this.alreadyProducedStones = alreadyProducedStones
        this.alreadyProducedWoods = alreadyProducedWoods
        this.nextProductionDate = nextProductionDate
    }

    checkCanBeUpdate(availableGolds, availableIrons, availableStones, availableWoods) {        
        return ( 
            this.goldsForUpdate <= availableGolds &&
            this.ironsForUpdate <= availableIrons && 
            this.stonesForUpdate <= availableStones && 
            this.woodsForUpdate <= availableWoods &&
            this.level < this.maxLevel)
    }
}