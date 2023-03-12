import { useContext, useEffect, useState } from "react"
import DefaultPage from "../../components/default-page/DefaultPage"
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'

import './SelectIsland.css'
import axios from "axios";
import Cookies from "universal-cookie";
import { PlayerContext } from "../../App";
import { useNavigate } from "react-router-dom";

export default function SelectIsland() {
    const { setPlayer } = useContext(PlayerContext)

    const [selectedIsland, setSelectedIsland] = useState(null)
    const [creatingPending, setCreatingPending] = useState(false)

    const cookie = new Cookies()
    const navigate = useNavigate()

    const token = cookie.get('token')

    function submitHandler(event) {
        event.preventDefault()
        setCreatingPending(true)

        axios.post('https://localhost:7276/api/Player/CreatePlayer', 
            selectedIsland, {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then(response => {
            setPlayer(response.data)
            navigate('/management')
        }).catch(() => {
            alert('Nem sikerült kapcsolódni a szerverhez')
        })
    }

    function selectIslandHandler(island) {
        setSelectedIsland(island)
    }

    useEffect(() => {
        axios.get('https://localhost:7276/api/Player/GetPlayer', {
            validateStatus: function (status) {
                return status < 500;
            },
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then(response => {
            if (response.status != 404) {
                setPlayer(response.data)
                navigate('/management')
            }
        }).catch(() => {
            alert('Nem sikerült kapcsolódni a szerverhez')
        })

    }, [])

    return (
        <DefaultPage
            title={'Válassz szigetet'}
            navigations={[
                <Button>Hello</Button>,
                <Button>World</Button>,
                <Button>Example</Button>
            ]}
        >
            <form className="island-select-form" onSubmit={event => submitHandler(event)}>
                <div className="card-container">
                    <Card
                        className={selectedIsland == 'europian' ? 'bg-primary' : null}
                        onClick={() => selectIslandHandler('europian')}
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
                        onClick={() => selectIslandHandler('indian')}
                    >
                        <Card.Img variant="top" src="../assets/indian-island.png" />
                        <Card.Body className="text-center">
                            <Card.Title>Indián sziget</Card.Title>
                            <Card.Text>
                                Some quick example text to build on the card title and make up the
                                bulk of the card's content.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card
                        className={selectedIsland == 'viking' ? 'bg-primary' : null}
                        onClick={() => selectIslandHandler('viking')}
                    >
                        <Card.Img variant="top" src="../assets/viking_island.png" />
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
                        onClick={() => selectIslandHandler('japan')}
                    >
                        <Card.Img variant="top" src="../assets/japanese_island.png" />
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
                    <Button disabled={!selectedIsland || creatingPending} type="submit">Sziget mentése</Button>
                </div>
            </form>
        </DefaultPage>
    )
}