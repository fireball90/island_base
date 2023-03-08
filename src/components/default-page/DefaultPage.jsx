
import { Link } from "react-router-dom";
import style from './DefaultPage.module.css'

export default function ({ title, navigations, children }) {
    return (
        <div className={style.blur}>
            <div className={style.container}>
                <div className={style.popup}>
                    <div className={style.header}>
                        <div className={style.title}>
                            <h2>{ title }</h2>
                        </div>
                        <div className={style.navigation}>
                            {
                                navigations.map((navigation, index) => (
                                    <div key={index}>{navigation}</div>
                                ))
                            }
                        </div>
                        <Link to="/management">
                            <div className={style.close}></div>
                        </Link>
                    </div>
                    <div className={style.body}>
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}