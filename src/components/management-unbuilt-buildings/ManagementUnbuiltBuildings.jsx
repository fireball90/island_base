import UnbuiltBuilding from '../unbuilt-building/UnbuiltBuilding'

export default function ManagementUnbuiltBuildings() {
    return (
        <div className="w-100 h-100 d-flex flex-wrap gap-3 align-content-start">
            <UnbuiltBuilding
                isLocked={true}
                building={
                    {
                        name: 'Templom',
                        spritePath: '/assets/house-lvl-1.png',
                        description: 'This is a description',
                        coinsForBuild: 0,
                        ironsForBuild: 0,
                        stonesForBuild: 0,
                        woodsForBuild: 0,
                        buildTime: 1000
                    }
                }
            />
            <UnbuiltBuilding
                building={
                    {
                        name: 'Templom',
                        spritePath: '/assets/house-lvl-1.png',
                        description: 'This is a description',
                        coinsForBuild: 0,
                        ironsForBuild: 0,
                        stonesForBuild: 0,
                        woodsForBuild: 0,
                        buildTime: 1000
                    }
                }
            />
            <UnbuiltBuilding
                building={
                    {
                        name: 'Templom',
                        spritePath: '/assets/house-lvl-1.png',
                        description: 'This is a description',
                        coinsForBuild: 0,
                        ironsForBuild: 0,
                        stonesForBuild: 0,
                        woodsForBuild: 0,
                        buildTime: 1000
                    }
                }
            />
            <UnbuiltBuilding
                building={
                    {
                        name: 'Templom',
                        spritePath: '/assets/house-lvl-1.png',
                        description: 'This is a description',
                        coinsForBuild: 0,
                        ironsForBuild: 0,
                        stonesForBuild: 0,
                        woodsForBuild: 0,
                        buildTime: 1000
                    }
                }
            />
            <UnbuiltBuilding
                building={
                    {
                        name: 'Templom',
                        spritePath: '/assets/house-lvl-1.png',
                        description: 'This is a description',
                        coinsForBuild: 0,
                        ironsForBuild: 0,
                        stonesForBuild: 0,
                        woodsForBuild: 0,
                        buildTime: 1000
                    }
                }
            />
        </div>
    )
}