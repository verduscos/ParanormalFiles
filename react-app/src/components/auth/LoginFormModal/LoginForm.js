import React, { useState } from "react";
import { login } from "../../../store/session";
import { useDispatch } from "react-redux";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(credential, password));
    if (data) {
      setErrors(data);
    }
  };

  const demo = async (e) => {
    await dispatch(login("demo@aa.io", "password"))
  }

  return (
    <form onSubmit={onLogin} className='modal'>
      <h2 className='modal-title'>Log in!</h2>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          className='inputs'
          placeholder="Email"

        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='inputs'
          placeholder="Password"
        />
      <button type="submit" className="modalButts">Log In</button>
      <button onClick={demo} className="modalButts">Demo</button>
    </form>
  );
}

export default LoginForm;
