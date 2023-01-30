import { Component } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';

import "./UpdateBuildingDialog.css"

export default class UpdateBuildingDialog extends Component {
    interval
    
    constructor(props) {
        super(props)

        this.state = {
            timeRemainingUntilProduction: null
        }

        this.interval = null
    }

    startReaminingTime() {
        this.handleTimeChange()

        this.interval = setInterval(() => {
            this.handleTimeChange()
        }, 1000);
    }

    handleTimeChange() {
        const currentDate = new Date()

        this.setState(state => ({
            ...state,
            timeRemainingUntilProduction: new Date(this.props.building.nextProductionDate - currentDate)
        }))
    }

    getSnapshotBeforeUpdate(prevProps) {
        if (prevProps.show == false && this.props.show == true) {
            return 1
        } else if (prevProps.show == true && this.props.show == false) {
            return 0
        } else {
            return -1
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot == 1) {
            this.startReaminingTime()
        } else if (snapshot == 0) {
            clearInterval(this.interval)
        }
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                centered
                size="lg"
                className='bg-transparent text-light'
                >
                <div className='update-modal-bg text-light p-4 pt-2'>
                <Modal.Header> 
                    <Modal.Title id="contained-modal-title-vcenter bg-transparent text-light">
                        { this.props.building?.name } ( { this.props.building?.level } / { this.props.building?.maxLevel } )   
                        <h6 className="card-subtitle mb-0 text-light">
                            { this.props.building?.description }
                        </h6> 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2 mb-2 bg-transparent text-light">
                        Termelés elkészül:  { this.state.timeRemainingUntilProduction?.getHours() - 1}h { this.state.timeRemainingUntilProduction?.getMinutes() }m { this.state.timeRemainingUntilProduction?.getSeconds() }s
                    </div>
                    <Table responsive bordered className='text-light  bg-transparent'>
                        <thead>
                            <tr>
                                <th colSpan="3">Termelt nyersanyagok</th>
                            </tr>
                            <tr>
                                <th>Nyersanyag</th>
                                <th>Mennyiség</th>
                                <th>Időtartam</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Arany</td>
                                <td>{ this.props.building?.produceCoinCount } darab</td>
                                <td>{ this.props.building?.productionInterval / 60000 } perc</td>
                            </tr>
                            <tr>
                                <td>Vas</td>
                                <td>{ this.props.building?.produceIronsCount } darab</td>
                                <td>{ this.props.building?.productionInterval / 60000 } perc</td>
                            </tr>
                            <tr>
                                <td>Kő</td>
                                <td>{ this.props.building?.produceStonesCount } darab</td>
                                <td>{ this.props.building?.productionInterval / 60000 } perc</td>
                            </tr>
                            <tr>
                                <td>Fa</td>
                                <td>{ this.props.building?.produceWoodsCount } darab</td>
                                <td>{ this.props.building?.productionInterval / 60000 } perc</td>
                            </tr>
                        </tbody>
                    </Table>
                
                    <Table responsive bordered className='text-light mb-0  bg-transparent'>
                    <thead>
                        <tr>
                            <th colSpan="3">Fejlesztéshez szükséges nyersanyagok</th>
                        </tr>
                        <tr>
                            <th>Nyersanyag</th>
                            <th>Készleten</th>
                            <th>Szükséges</th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td>Arany</td>
                                <td>
                                    {this.props.items.coins} darab
                                </td>
                                <td>
                                    {this.props.building?.coinsForUpdate} darab
                                </td>
                            </tr>
                            <tr>
                                <td>Vas</td>
                                <td>
                                    {this.props.items.irons} darab
                                </td>
                                <td>
                                    {this.props.building?.ironsForUpdate} darab
                                </td>
                            </tr>
                            <tr>
                                <td>Kő</td>
                                <td>
                                    {this.props.items.stones} darab
                                </td>
                                <td>
                                    {this.props.building?.stonesForUpdate} darab
                                </td>
                            </tr>
                            <tr>
                                <td>Fa</td>
                                <td>
                                    {this.props.items.woods} darab
                                </td>
                                <td>
                                    {this.props.building?.woodsForUpdate} darab
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer
                        className='p-5 pt-0 pb-0 mb-4  bg-transparent'>
                    <Button                         
                        onClick={() => this.props.cancelUpdateBuilding()}
                        variant="outline-primary"
                        >
                        Mégse
                    </Button>
                    <Button 
                        onClick={() => this.props.updateBuilding(this.props.building)}
                        variant="primary" 
                        disabled={
                            !this.props.building?.checkCanBeUpdate(
                                this.props.items.coins,
                                this.props.items.irons,
                                this.props.items.stones,
                                this.props.items.woods,
                            )
                        }
                        >
                        Fejlesztés <i className="bi bi-box-arrow-up"></i>
                    </Button>
                </Modal.Footer>
                </div>
            </Modal>
        )
    }
}