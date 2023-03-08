import { useState } from "react"
import DefaultPage from "../../components/default-page/DefaultPage"
import LoadingScreen from "../../components/loading-screen/LoadingScreen"
import { Button } from 'react-bootstrap';

export default function SelectIsland() {
    const [isLoading, setIsLoading] = useState(false)


    return isLoading ? (
        <LoadingScreen loadingMessage={'Itt hamarosan elérhető lesz a sziget választás...'} />
    ) :
    (
        <DefaultPage 
            navigations={[
                <Button>Hello</Button>,
                <Button>World</Button>,
                <Button>Example</Button>
            ]}
        >

        </DefaultPage>
    )
}