import { Link } from "react-router-dom";
import style from "./Layout.module.css";

export default function Layout({ title, navigations, close, children }) {
  return (
    <div className={style.blur}>
      <div className={style.container}>
        <div className={style.popup}>
          <div className={style.header}>
            <div className={style.title}>
              <h3 className="text-white">{title}</h3>
            </div>
            <div className={style.navigation}>
              {navigations.map((navigation, index) => (
                <div key={index}>{navigation}</div>
              ))}
            </div>
            {close !== false ? (
              <Link to="/island">
                <div className={style.close}></div>
              </Link>
            ) : null}
          </div>
          <div className={style.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}