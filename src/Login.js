import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import validator from "validator";
import AlertCustom from "./Alert";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import { auth, db } from "./firebase";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const history = useHistory();

  const clearMessageAfter5Sec = () => {
    setTimeout(() => {
      setValidationMessage("");
    }, 5000);
  };
  const clearInputField = () => {
    setEmail("");
    setPassword("");
  };
  const handleSumbit = async (e) => {
    e.preventDefault();

    if (!validator.isEmail(email)) {
      setValidationMessage("Email must be  valid");

      clearMessageAfter5Sec();
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, password);
      clearInputField();
      history.push("/home");
    } catch (e) {
      setValidationMessage(e.message);
      clearMessageAfter5Sec();
      clearInputField();
    }
  };

  return (
    <div className='login_page'>
      <div className='login_logo'>
        <i className='fas fa-list-ol' />
      </div>
      <div className='loginContainer'>
        <h1 className='login_header'>Sign in to MyTaskTracker</h1>
        <div style={{ marginBottom: "5px" }}>
          {validationMessage ? (
            <Alert severity='error'>{validationMessage}</Alert>
          ) : (
            ""
          )}
        </div>
        <div className='userLogin'>
          <form autocomplete='off'>
            <div className='login_input'>
              <label>Email</label>
              <br />
              <input
                autocomplete='off'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                type='email'
              />
            </div>

            <div className='login_input'>
              <label>Password</label>
              <br />
              <input
                autocomplete='off'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='password'
                type='password'
              />
            </div>

            <button
              onClick={handleSumbit}
              type='submit'
              className='loginButton'
              disabled={!email || !password}
            >
              Sign In
            </button>
          </form>
          <div className='regLink'>
            <p>
              New to MyTaskTracker ?{" "}
              <Link to='/registration'>
                {" "}
                <b>
                  {" "}
                  <u> Create an account</u>{" "}
                </b>
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
