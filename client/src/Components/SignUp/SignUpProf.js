import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentAdmin,   signUpProf } from "../../Redux/actions/auth";
import Home from "../Home";

const SignUpProf = () => {
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
      matiere: data.get("matiere"),
      classes: data.get("classes"),
      email: data.get("email"),
      password: data.get("password"),
    });
    dispatch(
      signUpProf(
        {
          nom: data.get("nom"),
          prenom: data.get("prenom"),
          matiere: data.get("matiere"),
          classe: data.get("classe"),
          email: data.get("email"),
          password: data.get("password"),
        },
        history
      )
    );
  };
  const admin = useSelector((state) => state.adminReducer.admin);
  const loading = useSelector((state) => state.adminReducer.loading);
  console.log(admin && admin.role);

  return loading ? (
    <h1>loading...</h1>
  ) : admin && admin.role === "superadmin" ? (
    <div>
      <h1>SIGNUP Prof</h1>
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
          placeholder="matiere"
          className="input"
          name="matiere"
        />
        <input type="text" placeholder="classes" className="input" name="classes" />
        <input type="text" placeholder="email" className="input" name="email" />
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
};

export default SignUpProf;
