import style from './ButtonComponent.module.css'

export default function Button1() {
    return  <div >
                <div className="col-sm-2"></div>
                <div className="col-sm-10">
                    <button className={style.gomb} type="button" onClick={() =>{
                         var logininput = document.getElementById("login");
                         var pwdinput = document.getElementById("pwd");
                         var loginval = logininput.value;
                         var pwdval = pwdinput.value;

                         //CheckUsername();
                         //CheckPassword();
                    }}>
                    Küldés
                </button></div>
            </div>
}