import React from 'react';
import ButtonComponent from '../../components/button/ButtonComponent';

function Login() {
  return <div id="islandbg"><form id="form" className="d-flex align-items-center justify-items-center">
      <InputComponent InputId={"login"} LabelText={"Login"} InputType={"login"}></InputComponent>
      <InputComponent InputId={"pwd"} LabelText={"Pwd"} InputType={"password"}></InputComponent>
      <ButtonComponent></ButtonComponent>
      <button>Hello</button>
      </form></div>
     
}
function InputComponent({InputId, LabelText, InputType}) {
    return <div>
    <label htmlFor={InputId} className="col-sm-2 form-label">{LabelText}</label>
    <div class="col-sm-10">
      <input type={InputType} readOnly className="form-control" id={InputId}/>
    </div>
  </div>
}//className="mb-3 row"

export default Login;