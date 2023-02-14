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
        coinsForUpdate, 
        ironsForUpdate, 
        stonesForUpdate, 
        woodsForUpdate, 
        productionInterval,
        lastCollectTime,
        produceCoinCount,
        produceIronsCount,
        produceStonesCount,
        produceWoodsCount,
        alreadyProducedCoin,
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
        this.coinsForUpdate = coinsForUpdate
        this.ironsForUpdate = ironsForUpdate
        this.stonesForUpdate = stonesForUpdate
        this.woodsForUpdate = woodsForUpdate
        this.productionInterval = productionInterval
        this.lastCollectTime = lastCollectTime
        this.produceCoinCount = produceCoinCount
        this.produceIronsCount = produceIronsCount
        this.produceStonesCount = produceStonesCount
        this.produceWoodsCount = produceWoodsCount
        this.alreadyProducedCoin = alreadyProducedCoin
        this.alreadyProducedIrons = alreadyProducedIrons
        this.alreadyProducedStones = alreadyProducedStones
        this.alreadyProducedWoods = alreadyProducedWoods
        this.nextProductionDate = nextProductionDate
    }

    checkCanBeUpdate(availableCoins, availableIrons, availableStones, availableWoods) {        
        return ( 
            this.coinsForUpdate <= availableCoins &&
            this.ironsForUpdate <= availableIrons && 
            this.stonesForUpdate <= availableStones && 
            this.woodsForUpdate <= availableWoods &&
            this.level < this.maxLevel)
    }
}