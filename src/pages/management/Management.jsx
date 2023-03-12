import DefaultPage from "../../components/default-page/DefaultPage";
import style from './Management.module.css'

export default function Management() {
    return (
        <DefaultPage
            title={'Sziget menedzselés'}
            navigations={[]}
        >
            <div className={style.container}>
                <div className={style.abilityPoints}>
                    Képességpontok
                </div>
                <div className={style.buildings}>
                    <div className={style.building}>

                    </div>
                    <div className={style.building}>

                    </div>
                    <div className={style.building}>

                    </div>
                    <div className={style.building}>

                    </div>
                    <div className={style.building}>

                    </div>
                </div>
            </div>
        </DefaultPage>
    )
}