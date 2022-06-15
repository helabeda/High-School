import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { currentAdmin, signUpEleve,  } from "../../Redux/actions/auth";
import Home from "../Home";

const SignUpEleve = () => {
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
      identifiant: data.get("identifiant"),
      classe: data.get("classe"),
      
    });
    dispatch(
      signUpEleve(
        {
          nom: data.get("nom"),
          prenom: data.get("prenom"),
          identifiant: data.get("identifiant"),
          classe: data.get("classe"),
        },
        history
      )
    );
  };
//   const handleClasse = (value) => {
//     console.log("rerer", value);
//   };
  const admin = useSelector((state) => state.adminReducer.admin);
  const loading = useSelector((state) => state.adminReducer.loading);
  console.log(admin && admin.role);

  return loading ? (
    <h1>loading...</h1>
  ) : admin && admin.role === "superadmin" ? (
    <div>
      <h1>SIGNUP PARENT</h1>
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
          placeholder="identifiant"
          className="input"
          name="identifiant"
        />
        <select name="classe" defaultValue={"--"}>
          <option value="--" disabled>
            {" "}
            --{" "}
          </option>
          <optgroup label="7eme">
            <option value="7B1">7B1</option>
            <option value="7B2">7B2</option>
            <option value="7B3">7B3</option>
            <option value="7B4">7B4</option>
            <option value="7B5">7B5</option>
            <option value="7B6">7B6</option>
            <option value="7B7">7B7</option>
            <option value="7B8">7B8</option>
            <option value="7B9">7B9</option>
            <option value="7B10">7B10</option>
            <option value="7B11">7B11</option>
            <option value="7B12">7B12</option>
          </optgroup>
          <optgroup label="8eme">
            <option value="8B1">8B1</option>
            <option value="8B2">8B2</option>
            <option value="8B3">8B3</option>
            <option value="8B4">8B4</option>
            <option value="8B5">8B5</option>
            <option value="8B6">8B6</option>
            <option value="8B7">8B7</option>
            <option value="8B8">8B8</option>
            <option value="8B9">8B9</option>
            <option value="8B10">8B10</option>
            <option value="8B11">8B11</option>
            <option value="8B12">8B12</option>
          </optgroup>
          <optgroup label="9eme">
            <option value="9B1">9B1</option>
            <option value="9B2">9B2</option>
            <option value="9B3">9B3</option>
            <option value="9B4">9B4</option>
            <option value="9B5">9B5</option>
            <option value="9B6">9B6</option>
            <option value="9B7">9B7</option>
            <option value="9B8">9B8</option>
            <option value="9B9">9B9</option>
            <option value="9B10">9B10</option>
            <option value="9B11">9B11</option>
            <option value="9B12">9B12</option>
          </optgroup>
        </select>
        <button className="btn">Ajouter</button>
      </form>
    </div>
  ) : (
    <Home />
  );
};

export default SignUpEleve;
