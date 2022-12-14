import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(React.createElement(Register), document.getElementById("root"));
function Register() {
  return <div id="islandbg"><form id="form" class="d-flex align-items-center">
      <InputComponent InputId={"username"} LabelText={"Felhasználó név:"} InputType={"login"}></InputComponent>
      <InputComponent InputId={"email"} LabelText={"E-mail cím:"} InputType={"email"}></InputComponent>
      <InputComponent InputId={"pwd"} LabelText={"Jelszó:"} InputType={"password"}></InputComponent>
      <InputComponent InputId={"pwdCheck"} LabelText={"Jelszó megerősítése:"} InputType={"password"}></InputComponent>
      <ButtonComponent></ButtonComponent>
      <LinkComponent></LinkComponent>
      </form></div>
     
}
function InputComponent({InputId, LabelText, InputType}) {
    return <div>
    <label for={InputId} class="col-sm-2 form-label">{LabelText}</label>
    <div class="col-sm-10">
      <input type={InputType} readonly class="form-control" id={InputId}/>
    </div>
  </div>
}
function ButtonComponent() {
    return  <div>
                <div class="col-sm-2"></div>
                <div class="col-sm-10">
                    <button class="gomb" type="button" onClick={() =>{
                         var usernameInput = document.getElementById("username");
                         var emailInput = document.getElementById("email");
                         var pwdInput = document.getElementById("pwd");
                         var pwdCheckInput = document.getElementById("pwdCheck");
                         var usernameVal = usernameInput.value;
                         var emailVal = emailInput.value;
                         var pwdVal = pwdInput.value;
                         var pwdCheckVal = pwdCheckInput.value;

                         //CheckUsername();
                         //CheckPassword();
                         //CheckEmail();
                         //ConfirmPw();
                    }}>
                    Regisztráció
                </button></div>
            </div>
}
function LinkComponent(){
    return <div className="mb-3 row">
                <div class="col-sm-2"></div>
                <div class="col-sm-10">
                    <a href="login.jsx">Vissza belépéshez</a>
                </div>
    </div>
}

export default Register;
