import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Login), document.getElementById("root"));
function Login() {
  return <div id="islandbg"><form id="form" class="d-flex align-items-center justify-items-center">
      <InputComponent InputId={"login"} LabelText={"Login"} InputType={"login"}></InputComponent>
      <InputComponent InputId={"pwd"} LabelText={"Pwd"} InputType={"password"}></InputComponent>
      <ButtonComponent></ButtonComponent>
      </form></div>
     
}
function InputComponent({InputId, LabelText, InputType}) {
    return <div>
    <label for={InputId} class="col-sm-2 form-label">{LabelText}</label>
    <div class="col-sm-10">
      <input type={InputType} readonly class="form-control" id={InputId}/>
    </div>
  </div>
}//className="mb-3 row"
function ButtonComponent() {
    return  <div >
                <div class="col-sm-2"></div>
                <div class="col-sm-10">
                    <button class="gomb" type="button" onClick={() =>{
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
export default Login;