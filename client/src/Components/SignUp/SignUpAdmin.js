import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpAdmin } from '../../Redux/actions/auth';
import { currentAdmin } from "../../Redux/actions/auth";
import Home from '../Home';

const SignUpAdmin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
     useEffect(() => {
       dispatch(currentAdmin());
     }, [dispatch]);

    const submitLogin = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        nom: data.get("nom"),
        prenom: data.get("prenom"),
        email: data.get("email"),
        password: data.get("password"),
      });
      dispatch(
        signUpAdmin(
          {
            nom: data.get("nom"),
            prenom: data.get("prenom"),
            email: data.get("email"),
            password: data.get("password"),
          },
          history
        )
      );
    };
    const admin = useSelector((state) => state.adminReducer.admin);
    const loading = useSelector((state) => state.adminReducer.loading);
    console.log(admin&&admin.role)
    return loading ? (
      <h1>loading...</h1>
    ) : admin && admin.role === "superadmin" ? (
      <div>
        <h1>SIGNUP ADMINISTRATION</h1>
        <form onSubmit={submitLogin}>
          <h2>Login</h2>
          <input type="text" placeholder="nom" className="input" name="nom" />
          <input
            type="text"
            placeholder="prenom"
            className="input"
            name="prenom"
          />
          <input
            type="text"
            placeholder="email"
            className="input"
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            name="password"
          />
          <button className="btn">Login</button>
        </form>
      </div>
    ) : (
      <Home />
    );
}

export default SignUpAdmin
