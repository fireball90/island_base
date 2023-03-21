import React, { useRef, useState } from "react";
import '../register/register.css';
import { useForm } from 'react-hook-form';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";


export default function Register() {
  const [modalShow, setModalShow] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = data => {
      axios.post("https://localhost:7276/api/Auth/Registration", {
        data
      })
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Nem sikerült kapcsolódni a szerverhez.");
        } else {
          setErrorMessage("Hibás adatok!");
        }
      })
      .finally(() => {
        setModalShow(true);
      });
  };


  return <div className='d-flex justify-content-center align-items-center'>
    <div className='register-container justify-content-center d-flex align-items-center '>
      <div className='d-flex align-items-center flex-column'>

        <div className=''>
          <img className='register-img' alt='ISLANDERS' src='../images/islanders_logo.png'></img>
        </div>

        <div className=''>
          <img className='register-img2' alt='REGISZTRÁCIÓ' src='../images/regisztracio.png'></img>
        </div>

        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />

        <form id="form" className="" onSubmit={handleSubmit(onSubmit)}>

          <div className="justify-content-center form-group row pb-1">
            <label className="col-form-label text-center register-label">FELHASZNÁLÓ NÉV</label>
            <input className="register-input" type="text" placeholder="Név" id='username' {...register("username", { required: true, max: 30, min: 5, maxLength: 30, pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]+$/i })} />
              {errors.username?.type === "required" && <span className='reg-error-msg'>Kérjük adjon meg egy felhasználónevet.</span>}
              {errors.username?.type === "min" && <span className='reg-error-msg'>5 és 30 karakter közti hosszúságú nevet adjon meg</span>}
              {errors.username?.type === "maxLength" && <span className='reg-error-msg'>5 és 30 karakter közti hosszúságú nevet adjon meg.</span>}
              {errors.username?.type === "pattern" && <span className='reg-error-msg'>Kérjük csak az angol ABC betűit és számokat használjon.</span>}
          </div>

          <div className="justify-content-center form-group row pb-1">
            <label className="col-form-label text-center register-label">E-MAIL CÍM</label>
            <input className="register-input" type="text" placeholder="Email cím" id='email' {...register("email", { required: true, pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/i })} />
              {errors.email?.type === "required" && <span className='reg-error-msg'>Kérem adjon meg egy email címet.</span>}
              {errors.email?.type === "pattern" && <span className='reg-error-msg'>Kérem adjon meg egy helyes email címet. Pl: name@email.com</span>}
          </div>

          <div className="justify-content-center form-group row pb-1">
            <label className="col-form-label text-center register-label">JELSZÓ</label>
            <input className="register-input" name="password" type="password" placeholder="Jelszó" id='password' {...register("password", { required: true, max: 40, min: 8, maxLength: 40, pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,40}$/i })} />
              {errors.password?.type === "pattern" && <span className='reg-error-msg'>A jelszónak 8 - 40 karakter hosszúnak kell lennie.</span>}
              {errors.password?.type === "pattern" && <span className='reg-error-msg'>A jelszó tartalmazzon egy kisbetűt, egy nagybetűt és egy számot.</span>}
              {errors.password?.type === "maxLength" && <span className='reg-error-msg'>A jelszónak 8 - 40 karakter hosszúnak kell lennie.</span>}
          </div>

          <div className="justify-content-center form-group row pb-1">
            <label className="col-form-label text-center register-label">JELSZÓ ELLENŐRZÉSE</label>
            <input className="register-input" type="password" placeholder="Jelszó ellenőrzése" id='confirmPassword' {...register("confirmPassword", {
              validate: value =>
                value === password.current
            })} />
             {errors.confirmPassword && <span className='reg-error-msg'>Nem egyezik a fent megadott jelszóval!</span>}
          </div>

          <div>
            <span className="login-error-msg text-center">{errorMessage}</span>
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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className="successful-register-modal">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Sikeres regisztráció
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Az email címére küldtünk egy levelet a regisztráció befejezéséhez szükséges linkkel.
            Kérem kattintson rá, hogy véglegesítse a regisztrációt.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.onHide} className="modal-register-btn">Bezárás</button>
        </Modal.Footer>
      </div>
    </Modal>

  );
}