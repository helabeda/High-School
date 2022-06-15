import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginProf } from '../../Redux/actions/auth';
import AnimatedShapes from "../AnimatedShapes";
import "./Logcss.css"

const ProfLog = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const submitLogin = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });
      dispatch(
        loginProf(
          {
            email: data.get("email"),
            password: data.get("password"),
          },
          history
        )
      );
    };
    return (
      <div className="form">
        <AnimatedShapes />
        <form onSubmit={submitLogin} className="task">
          <h1 className="loginProf">LOGIN PROF</h1>
          <div className="input-container">
            <input
              type="email"
              placeholder="Email"
              className="input"
              name="email"
            />
            <div className="bar"></div>
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Password"
              className="input"
              name="password"
            />
            <div className="bar"></div>
          </div>
          <a href="/" className="link">
            Forgot your password?
          </a>
          <button className="btn">Login</button>
        </form>
      </div>
    );
}

export default ProfLog
