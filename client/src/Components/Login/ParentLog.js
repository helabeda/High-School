import React from 'react'
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {loginParent} from "../../Redux/actions/auth"

const ParentLog = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const submitLogin = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      
      console.log({
        identifiant: data.get("identifiant"),
        password: data.get("password"),
      });
      dispatch(
        loginParent(
          {
            identifiant: data.get("identifiant"),
            password: data.get("password"),
          },
          history
        )
      );
    };
    return (
      <div>
        <h1>LOGIN PARENT</h1>
        <form onSubmit={submitLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="identifiant"
            className="input"
            name="identifiant"
          />
          <label>Email</label>
          <input
            type="password"
            placeholder="Password"
            className="input"
            name="password"
          />
          <label>Password</label>
          <a href="/" className="link">
            Forgot your password?
          </a>
          <button className="btn">Login</button>
        </form>
      </div>
    );
}

export default ParentLog
