import React, { useRef } from "react";
import '../register/register.css';
import { useForm } from 'react-hook-form';


export function Register() {
    const { register, handleSubmit,watch, formState: { errors } } = useForm()
    const onSubmit = async data => {
      alert(JSON.stringify(data));
    };
    const password = useRef({});
    password.current = watch("password", "");

    return <div className='d-flex justify-content-center align-items-center'>
          <div className='register-container justify-content-center d-flex align-items-center '>
            <div className='d-flex align-items-center flex-column'>

                <div className=''>
                    <img className='register-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
                </div>

                <div className=''>
                    <img className='register-img2' alt='REGISZTRÁCIÓ' src='../images/regisztracio.png'></img>
                </div>

                <form id="form" className="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="justify-content-center form-group row pb-1">
                    <label className="col-form-label text-center register-label">FELHASZNÁLÓ NÉV</label>
                    <input className="register-input" type="text" placeholder="Név" id='name' {...register("name",{required: true, max: 30, min: 5, maxLength: 30, pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]+$/i})}/>
                    {errors.name?.type === "required" && <span className='reg-error-msg'>Kérjük adjon meg egy felhasználónevet.</span>}
                    {errors.name?.type === "min" && <span className='reg-error-msg'>5 és 30 karakter közti hosszúságú nevet adjon meg</span>}
                    {errors.name?.type === "maxLength" && <span className='reg-error-msg'>5 és 30 karakter közti hosszúságú nevet adjon meg.</span>}
                    {errors.name?.type === "pattern" && <span className='reg-error-msg'>Kérjük csak az angol ABC betűit és számokat használjon.</span>}
                  </div>
                  <div className="justify-content-center form-group row pb-1">
                    <label className="col-form-label text-center register-label">E-MAIL CÍM</label>
                    <input className="register-input" type="email" placeholder="Email cím" id='email' {...register("email",{required: true, pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i})}/>
                    {errors.email?.type === "required" && <span className='reg-error-msg'>Kérem adjon meg egy email címet.</span>}
                    {errors.email?.type === "pattern" && <span className='reg-error-msg'>Kérem adjon meg egy helyes email címet. Pl: name@email.com</span>}
                  </div>
                  <div className="justify-content-center form-group row pb-1">
                    <label className="col-form-label text-center register-label">JELSZÓ</label>
                    <input className="register-input" name="password" type="password" placeholder="Jelszó" id='password' {...register("password", {required: true, max: 40, min: 8, maxLength: 40, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/i})}/>
                    {errors.password?.type === "pattern" && <span className='reg-error-msg'>A jelszó tartalmazzon egy kisbetűt, egy nagybetűt, egy számot és egy speciális karaktert.</span>}
                    {errors.password?.type === "required" && <span className='reg-error-msg'>Adjon meg egy jelszót</span>}
                    {errors.password?.type === "min" && <span className='reg-error-msg'>Legalább 8 karakter hosszúnak kell lennie a jelszónak.</span>}
                    {errors.password?.type === "maxLength" && <span className='reg-error-msg'>Legfeljebb 40 karakter hosszúnak kell lennie a jelszónak.</span>}
                  </div>
                  <div className="justify-content-center form-group row pb-1">
                    <label className="col-form-label text-center register-label">JELSZÓ ELLENŐRZÉSE</label>
                    <input className="register-input" type="password" placeholder="Jelszó ellenőrzése" id='passwordCheck' {...register("passwordCheck",{validate: value =>
            value === password.current})}/>
                    {errors.passwordCheck && <span className='reg-error-msg'>Nem egyezik a fent megadott jelszóval!</span>}
                  </div>
                  <div className='d-flex justify-content-center'>
                    <button type="submit" className='btn btn-button3'>Regisztráció</button>
                  </div>
                </form>
                
                <div className='d-flex justify-content-center'>
                    <p className='ml-auto register-link'><a href='/login'>Már regisztrált? Lépjen be!</a></p>
                </div>

            </div>   
          </div>
        </div>
}

/* var usernameInput = document.getElementById("username");
var emailInput = document.getElementById("email");
var pwdInput = document.getElementById("pwd");
var pwdCheckInput = document.getElementById("pwdCheck");
var usernameVal = usernameInput.value;
var emailVal = emailInput.value;
var pwdVal = pwdInput.value;
var pwdCheckVal = pwdCheckInput.value; */


export default Register;
