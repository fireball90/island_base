import React, { useState } from 'react'
import { Button, Card } from "react-bootstrap"

import style from "./BlockMessage.module.css"

export default function BlockMessage({ show, title, message }) {
    const [messageVisible, setMessageVisible] = useState(true)
    
    function handleClick() {
        setMessageVisible(false)
    }

    return show ? (
        <div className={style.block}>
            {
                messageVisible ? (
                    <Card style={{ width: '22rem' }} className="rounded-0 border-0">
                        <Card.Header className="d-flex justify-content-between align-items-center bg-white">
                            <span className="fw-bold">{ title }</span>
                            <i className="bi bi-exclamation-square-fill fs-5 text-danger"></i>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                { message }
                            </Card.Text>
                            <div className='text-end'>
                                <Button variant='primary' size='sm' onClick={() => handleClick()}>Rendben</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ) : null
            }
        </div>
    ) : (
        null
    )
}