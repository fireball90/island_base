import axios from "axios";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export default function ResendVerifyEmailForm() {
  const [email, setEmail] = useState("");
  const [isVerifyingPending, setIsVerifyingPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [isEmailSended, setIsEmailSended] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function submit(event) {
    event.preventDefault();
    setIsVerifyingPending(true);

    axios
      .post(`https://localhost:7276/api/Auth/ResendVerifyEmail?email=${email}`)
      .then(() => setIsEmailSended(true))
      .catch((error) => {
        if (error.code === "ERR_NETWORK") {
          setErrorMessage("Nem sikerült kapcsolódni a szerverhez!");
        } else {
          setErrorMessage("Nem található felhasználó ezzel az email címmel!");
        }
      })
      .finally(() => setIsVerifyingPending(false));
  }

  function inputErrorMessage() {
    return isEmailTouched && email.length === 0 ? (
      <Form.Text className="text-danger">
        Az email cím megadása kötelező!
      </Form.Text>
    ) : null;
  }

  function formErrorMessage() {
    return errorMessage ? (
      <div className="text-danger text-center">{errorMessage}</div>
    ) : null;
  }

  return !isEmailSended ? (
    <form
      onSubmit={(event) => submit(event)}
      className="d-flex flex-column w-100"
    >
      <div className="h6 text-center">Ellenőrző email újraküldése</div>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email cím</Form.Label>
        <Form.Control
          type="text"
          placeholder="valaki@email.hu"
          onBlur={() => setIsEmailTouched(true)}
          value={email}
          onChange={(event) => handleEmailChange(event)}
        />
        {inputErrorMessage()}
      </Form.Group>
      <Button type="submit" disabled={email.length === 0 || isVerifyingPending}>
        Megerősítő email újraküldése
      </Button>
      {formErrorMessage()}
    </form>
  ) : (
    <div className="h6">
      Elküldtük a megerősítő emailt a megadott címre!
    </div>
  );
}