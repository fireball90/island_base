import { useContext, useEffect, useState } from "react"
import DefaultPage from "../../components/default-page/DefaultPage"
import LoadingScreen from "../../components/loading-screen/LoadingScreen"
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

import './SelectIsland.css'
import axios from "axios";
import Cookies from "universal-cookie";
import { PlayerContext } from "../../App";

export default function SelectIsland() {
    const { setPlayer } = useContext(PlayerContext)
    const cookie = new Cookies()
    
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIsland, setSelectedIsland] = useState(null)

    useEffect(() => {
        const token = cookie.get('token')
        
        axios.get('https://localhost:7276/api/Player/GetPlayer', {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then(response => {
            setPlayer(response.data)
        }).catch(error => {
            console.log(error)
        })

    }, [])

    function handleSelectIsland(island) {
        setSelectedIsland(island)
    }

    return isLoading ? (
        <LoadingScreen loadingMessage={'Sziget adatainak betöltése...'} />
    ) :
        (
            <DefaultPage
                title={'Válassz szigetet'}
                navigations={[
                    <Button>Hello</Button>,
                    <Button>World</Button>,
                    <Button>Example</Button>
                ]}
            >
                <div className="island-select-container">
                    <div className="card-container">
                        <Card 
                            className={selectedIsland == 'europian' ? 'bg-primary' : null}
                            onClick={() => handleSelectIsland('europian')}
                        >
                            <Card.Img variant="top" src="../assets/europian_island.png" />
                            <Card.Body className="text-center">
                                <Card.Title>Európai sziget</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card 
                            className={selectedIsland == 'indian' ? 'bg-primary' : null}
                            onClick={() => handleSelectIsland('indian')}
                        >
                            <Card.Img variant="top" src="../assets/europian_island.png" />
                            <Card.Body className="text-center">
                                <Card.Title>Indián sziget</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card 
                            className={selectedIsland == 'viking' ? 'bg-primary' : null }
                            onClick={() => handleSelectIsland('viking')}
                        >
                            <Card.Img variant="top" src="../assets/europian_island.png" />
                            <Card.Body className="text-center">
                                <Card.Title>Viking sziget</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card 
                            className={selectedIsland == 'japan' ? 'bg-primary' : null}
                            onClick={() => handleSelectIsland('japan')}
                        >
                            <Card.Img variant="top" src="../assets/europian_island.png" />
                            <Card.Body className="text-center">
                                <Card.Title>Japán sziget</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                    <div class="save-button-container">
                        <Button disabled={!selectedIsland}>Sziget mentése</Button>
                    </div>
                </div>
            </DefaultPage>
        )
}